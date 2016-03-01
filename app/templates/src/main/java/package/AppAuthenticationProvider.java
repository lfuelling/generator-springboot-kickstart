package <%=packageName%>;

import <%=packageName%>.entities.User;
import <%=packageName%>.repositories.UserRepository;
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
   * @param authentication the authentication provided by the user
   * @return auth, if authenticated. Otherwise null.
   * @throws AuthenticationException
     */
  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {

    // User's credentials
    String name = authentication.getName();
    String password = authentication.getCredentials().toString();

    // Search the db for given username
    User user = userRepository.findByUsername(name);

    if (user == null) {
      // If user doesn't exist, log and return null
      logger.error("Unable to find user: " + name);
      return null;
    } else {
      if (password.equals(user.getPassword())) {
        // If credentials are correct
        List<GrantedAuthority> grantedAuths = new ArrayList<>();
        grantedAuths.add(new SimpleGrantedAuthority(Consts.ROLE_USER));
        try {
          // Check if user is admin, if so add admin role
          if (user.getAdminState()) {
            grantedAuths.add(new SimpleGrantedAuthority(Consts.ROLE_ADMIN));
          }
        } catch (NullPointerException npe) {
          // If user's admin state is null, set it to false (should never happen because null booleans are returned as false)
          logger.info("Admin state was 'null' for user: " + name + ". Setting it to false to prevent future NullPointers");
          user.setAdminState(false);
        }
        // Return auth object
        Authentication auth = new UsernamePasswordAuthenticationToken(name, password, grantedAuths);
        return auth;
      } else {
        // If credentials are wrong, return null
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
