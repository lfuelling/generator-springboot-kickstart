package io.lerk.webapp;

import io.lerk.webapp.entities.User;
import io.lerk.webapp.repositories.UserRepository;
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
 * @author Lukas F&uuml;lling (l.fuelling@micromata.de)
 */
@Component
public class AppAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    UserRepository userRepository;

    Logger logger = LoggerFactory.getLogger(AuthenticationProvider.class);


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();

        User user = userRepository.findByUsername(name);

        if (user == null) {
            logger.error("Unable to find user: " + name);
            return null;
        } else {
            if (password.equals(user.getPassword())) {
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
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
