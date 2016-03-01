package <%=packageName%>;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * The class where we define the access rules for the different roles.
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Our authentication provider
    @Autowired
    AppAuthenticationProvider webappAuthenticationProvider;

  /**
   * Configures the security context.
   * @param http HttpSecurity object coming from Spring
   * @throws Exception
   */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //super.configure(http);
        http.authorizeRequests().antMatchers("/", "/home").permitAll().anyRequest().authenticated()
                .and().authorizeRequests().antMatchers("/register").permitAll() // check for "registerPublic" property is done in the LoginController because Autowiring the sysConfRepo is not possible here.
                .and().authorizeRequests().antMatchers("/help").permitAll()
                .and().formLogin().loginPage("/login").defaultSuccessUrl("/in").permitAll()
                .and().logout().permitAll()
                // I needed this to make my javascript work.
                .and().csrf().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/register", "/help");
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(webappAuthenticationProvider);
    }
}
