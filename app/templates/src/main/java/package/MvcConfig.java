package <%=packageName%>;

  import org.apache.catalina.Context;
  import org.apache.catalina.connector.Connector;
  import org.apache.tomcat.util.descriptor.web.SecurityCollection;
  import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
  import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
  import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.context.support.ReloadableResourceBundleMessageSource;
  import org.springframework.web.servlet.LocaleResolver;
  import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
  import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
  import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
  import org.springframework.web.servlet.i18n.SessionLocaleResolver;
  import java.util.Locale;

/**
 * Config class for all sorts of stuff.
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {

  /**
   * Registers the viewControllers (I don't know if this is strictly necessary if you use path matching)
   *
   * @param registry
   */
  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    // homepage controller
    registry.addViewController("/").setViewName("platform");
    // login controller
    registry.addViewController("/login").setViewName("login");
    registry.addViewController("/register").setViewName("register");
    // platform controller
    registry.addViewController("/in").setViewName("platform");
    // error controller
    registry.addViewController("/error").setViewName("error");
  }

  /**
   * Because the main app is running on 8443, launch a redirecting connector to 8080
   * @return the connector
   */
  private Connector initiateHttpConnector() {
    Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
    connector.setScheme("http");
    connector.setPort(8080);
    connector.setSecure(false);
    connector.setRedirectPort(8443);

    return connector;
  }

  /**
   * The localeResolver for i18n. Default language is english.
   *
   * @return the localeResolver
   */
  @Bean
  public LocaleResolver localeResolver() {
    SessionLocaleResolver slr = new SessionLocaleResolver();
    slr.setDefaultLocale(Locale.ENGLISH);
    return slr;
  }

  /**
   * Defines where the i18n messages are located and sets cache to one hour.
   * Path is: <pre>/src/main/resources/locale/messages_[locale].properties</pre>
   *
   * @return the messageSource
   */
  @Bean
  public ReloadableResourceBundleMessageSource messageSource() {
    ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
    messageSource.setBasename("classpath:locale/messages");
    messageSource.setCacheSeconds(3600); // Cache for one hour
    return messageSource;
  }

  /**
   * The localeChangeInterceptor is responsible for changing the language when the 'lang' parameter is used in a URL.
   * example: <pre>localhost:8443/?lang=en</pre> for english language.
   * @return the localeChangeInterceptor
   */
  @Bean
  public LocaleChangeInterceptor localeChangeInterceptor () {
    LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
    lci.setParamName("lang");
    return lci;
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
}
