package <%=packageName%>;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Locale;

/**
 * Class used to get messages from I18N resources.
 *
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
@Component
public class MessageByLocaleService {

  // The message source defined in the MvcConfig
  @Autowired
  private MessageSource messageSource;

  /**
   * Gets a message from i18n resources according to current locale.
   *
   * @param id the id of the message
   * @return the message
   */
  public String getMessage(String id) {
    Locale locale = LocaleContextHolder.getLocale();
    return messageSource.getMessage(id, null, locale);
  }

  /**
   * Gets a message and formats it according to HashMap before returning.
   *
   * @param id           The id of the message
   * @param replaceables HashMap&lt;StringToBeReplaced, StringToReplace&gt;
   * @return the formatted message
   */
  public String getMessage(String id, HashMap<String, String> replaceables) {
    final String[] message = {getMessage(id)};
    replaceables.entrySet().stream().forEach(entry -> message[0] = message[0].replaceAll(entry.getKey(), entry.getValue()));
    return message[0];
  }
}

