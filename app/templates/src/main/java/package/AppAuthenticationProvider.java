package <%=packageName%>;

  import <%=packageName%>.entities.User;
  import <%=packageName%>.repositories.UserRepository;
  import <%=packageName%>.PasswordStorage;
  import org.slf4j.Logger;
  import org.slf4j.LoggerFactory;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.security.authentication.AuthenticationProvider;
  import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
  import org.springframework.security.core.Authentication;
  import org.springframework.security.core.AuthenticationException;
  import org.springframework.security.core.GrantedAuthority;
  import org.springframework.security.core.authority.SimpleGrantedAuthority;
  import org.springframework.stereotype.Component;

  import java.util.ArrayList;
  import java.util.List;

/**
 * This is the authenticationProver we use to authenticate users.
 *
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
@Component
public class AppAuthenticationProvider implements AuthenticationProvider {

  // Our Database repository for users
  @Autowired
  UserRepository userRepository;

  // The logger we use in this class
  Logger logger = LoggerFactory.getLogger(AuthenticationProvider.class);

  /**
   * Checks username and password with the stuff that's in the db.
   *
   * @param authentication the authentication provided by the user
   * @return auth, if authenticated. Otherwise null.
   * @throws AuthenticationException
   */
  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String name = authentication.getName();
    String password = authentication.getCredentials().toString();

    User user = userRepository.findByUsername(name);

    if (user == null) {
      logger.error("Unable to find user: " + name);
      return null;
    } else {
      try {
        if (PasswordStorage.verifyPassword(password, user.getPassword())) {
          List<GrantedAuthority> grantedAuths = new ArrayList<>();
          grantedAuths.add(new SimpleGrantedAuthority(Consts.ROLE_USER));
          try {
            if (user.getAdminState()) {
              grantedAuths.add(new SimpleGrantedAuthority(Consts.ROLE_ADMIN));
            }
          } catch (NullPointerException npe) {
            logger.info("Admin state was 'null' for user: " + name + ". Setting it to false to prevent future NullPointers");
            user.setAdminState(false);
          }
          Authentication auth = new UsernamePasswordAuthenticationToken(name, password, grantedAuths);
          return auth;
        } else {
          return null;
        }
      } catch (PasswordStorage.CannotPerformOperationException | PasswordStorage.InvalidHashException e) {
        logger.error("Unable to check password!", e);
        return null;
      }
    }
  }

  // We only supprt username & password based auth
  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }
}
