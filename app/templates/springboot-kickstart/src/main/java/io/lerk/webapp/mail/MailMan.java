package io.lerk.webapp.mail;

import io.lerk.webapp.Consts;
import io.lerk.webapp.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

/**
 * Class that handles Mail stuff.
 * @author Lukas F&uuml;lling (l.fuelling@micromata.de)
 */
@Component
public class MailMan {

    private static final String KEY_HOST_SETTING = "mail.smtp.host";

    @Autowired
    private MailProps mailProps;

    /**
     * Sends a message to a user.
     * @param user the user who should get the message
     * @param content the content of the message
     * @param subject the subject of the message
     */
    public void sendMail(User user, String content, String subject) {

        Logger logger = LoggerFactory.getLogger(MailMan.class);

        if(user.getEmail() == null) {
            logger.error("User has no email set! Unable to send mail!");
            return;
        }

        Properties props = new Properties();
        props.put(KEY_HOST_SETTING, mailProps.getHost());

        Session session = Session.getInstance(props, null);

        try {
            MimeMessage msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(mailProps.getFrom()));
            InternetAddress[] address = {new InternetAddress(user.getEmail())};
            msg.setRecipients(Message.RecipientType.TO, address);
            msg.setSubject(subject);
            msg.setSentDate(new Date());
            msg.setHeader("X-Mailer", Consts.MAIL_XMAILER);
            msg.setText(content);
            msg.saveChanges(); // don't forget this
            if (mailProps.isAuthrequired()) {
                if (mailProps.getAuthpass().equals("changeme") || mailProps.getAuthusr().equals("changeme")) {
                    logger.warn("It seems like you didn't change the standard mail auth settings.");
                }
                Transport tr = session.getTransport("smtp");
                tr.connect(mailProps.getHost(), mailProps.getAuthusr(), mailProps.getAuthpass());
                tr.sendMessage(msg, msg.getAllRecipients());
                tr.close();
            } else {
                Transport.send(msg);
            }

            logger.debug("Email sent to " + user.getUsername());
        } catch (MessagingException mex) {
            logger.error("Error sending mail: ", mex);
        }
    }


}
