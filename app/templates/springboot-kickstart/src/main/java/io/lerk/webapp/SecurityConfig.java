package io.lerk.webapp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    AppAuthenticationProvider webappAuthenticationProvider;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //super.configure(http);
        http.authorizeRequests().antMatchers("/", "/home").permitAll().anyRequest().authenticated()
                .and().authorizeRequests().antMatchers("/register").permitAll() // check for "registerPublic" property is done in the LoginController because Autowiring the sysConfRepo is not possible here.
                .and().authorizeRequests().antMatchers("/help").permitAll()
                .and().formLogin().loginPage("/login").defaultSuccessUrl("/in").permitAll()
                .and().logout().permitAll()
                .and().authorizeRequests().antMatchers("/cmd").hasRole("ADMIN")
                .and().authorizeRequests().antMatchers("/add").hasRole("ADMIN")
                .and().authorizeRequests().antMatchers("/edit").hasRole("ADMIN")
                .and().authorizeRequests().antMatchers("/in/settings").hasRole("ADMIN")
                .and().authorizeRequests().antMatchers("/delete").hasRole("ADMIN")
                .and().authorizeRequests().antMatchers("/ecmd").hasAnyRole("ADMIN", "USER")
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
