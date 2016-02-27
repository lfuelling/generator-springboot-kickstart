package io.lerk.webapp;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author Lukas F&uuml;lling (l.fuelling@micromata.de)
 */
@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // homepage controller
        registry.addViewController("/").setViewName("home");
        registry.addViewController("/home").setViewName("home");
        // login controller
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/register").setViewName("register");
        // platform controller
        registry.addViewController("/in").setViewName("platform");
        // error controller
        registry.addViewController("/error").setViewName("error");
        // editor controller
        registry.addViewController("/editor").setViewName("editor");
        // admin controller
        registry.addViewController("/add").setViewName("add");
        registry.addViewController("/in/settings").setViewName("settings");
        registry.addViewController("/edit").setViewName("edit");
        registry.addViewController("/delete/course").setViewName("deleteCourse");
        registry.addViewController("/delete/level").setViewName("deleteLevel");
    }

    @Bean
    public EmbeddedServletContainerFactory servletContainer() {
        TomcatEmbeddedServletContainerFactory tomcat = new TomcatEmbeddedServletContainerFactory() {
            @Override
            protected void postProcessContext(Context context) {
                SecurityConstraint securityConstraint = new SecurityConstraint();
                securityConstraint.setUserConstraint("CONFIDENTIAL");
                SecurityCollection collection = new SecurityCollection();
                collection.addPattern("/*");
                securityConstraint.addCollection(collection);
                context.addConstraint(securityConstraint);
            }
        };

        tomcat.addAdditionalTomcatConnectors(initiateHttpConnector());
        return tomcat;
    }

    private Connector initiateHttpConnector() {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setScheme("http");
        connector.setPort(8080);
        connector.setSecure(false);
        connector.setRedirectPort(8443);

        return connector;
    }
}
