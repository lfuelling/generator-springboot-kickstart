package io.lerk.webapp.mail;

import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * The configuration for the mail system.
 * @author Lukas F&uuml;lling (lukas@k40s.net)
 */
@Configuration
@ConditionalOnClass(MailMan.class)
@EnableConfigurationProperties
@ConfigurationProperties(prefix="mail.smtp")
public class MailProps {
    /**
     * The host name of the mail server
     */
    String host;

    /**
     * The mail address to be used in 'from'
     */
    String from;

    /**
     * Does the server require auth?
     */
    boolean authrequired;

    /**
     * Auth password
     */
    String authpass;

    /**
     * Auth username
     */
    String authusr;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public boolean isAuthrequired() {
        return authrequired;
    }

    public void setAuthrequired(boolean authrequired) {
        this.authrequired = authrequired;
    }

    public String getAuthpass() {
        return authpass;
    }

    public void setAuthpass(String authpass) {
        this.authpass = authpass;
    }

    public String getAuthusr() {
        return authusr;
    }

    public void setAuthusr(String authusr) {
        this.authusr = authusr;
    }
}
