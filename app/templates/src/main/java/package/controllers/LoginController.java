package <%=packageName%>.controllers;

import <%=packageName%>.Consts;
import <%=packageName%>.MessageByLocaleService;
import <%=packageName%>.entities.User;
import <%=packageName%>.repositories.SysConfigRepository;
import <%=packageName%>.repositories.UserRepository;
import <%=packageName%>.PasswordStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;

/**
 * Handles the login page.
 *
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
@Controller
@EnableAutoConfiguration
public class LoginController {

  @Autowired
  private SysConfigRepository sysConfigRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private MessageByLocaleService messageByLocaleService;

  Logger logger = LoggerFactory.getLogger(LoginController.class);

  /**
   * Builds the login page.
   *
   * @return the login page mav
   */
  @RequestMapping("/login")
  ModelAndView login() {
    ModelAndView mav = new ModelAndView();
    mav.setViewName("login");
    mav.addObject("title", sysConfigRepository.findByKey(Consts.KEY_APP_TITLE).getValue() + " - " + messageByLocaleService.getMessage("login.page.title"));
    mav.addObject("register_public", Boolean.parseBoolean(sysConfigRepository.findByKey(Consts.KEY_REGISTER_PUBLIC).getValue()));
    return mav;
  }

  /**
   * Builds the registration page.
   *
   * @return the registration mav
   */
  @RequestMapping("/register")
  ModelAndView register() {
    if (!Boolean.parseBoolean(sysConfigRepository.findByKey(Consts.KEY_REGISTER_PUBLIC).getValue())) {
      Assert.notNull(null, messageByLocaleService.getMessage("login.page.register.false"));
    }
    ModelAndView mav = new ModelAndView();
    mav.setViewName("register");
    mav.addObject("user", new User());
    mav.addObject("title", sysConfigRepository.findByKey(Consts.KEY_APP_TITLE).getValue() + " - " + messageByLocaleService.getMessage("register.page.title"));
    return mav;
  }

  /**
   * Handles registration attempts.
   *
   * @param user the user who should be registered
   * @return the registration mav
   */
  @RequestMapping(value = "/register", method = RequestMethod.POST)
  public ModelAndView levelAddSubmit(@ModelAttribute User user) {
    Assert.notNull(user, messageByLocaleService.getMessage("platform.error.invalid.input"));
    Assert.isTrue(user.getPassword().equals(user.getId()), messageByLocaleService.getMessage("register.page.error.password"));
    user.setId(null); // remove the second password (I needed a unused String for the confirmation)
    user.setAdminState(false); // only admin can create admins
    try {
      user.setPassword(PasswordStorage.createHash(user.getPassword()));
    } catch (PasswordStorage.CannotPerformOperationException e) {
      logger.error("Unable to create password hash!", e);
      Assert.notNull(null, "Unable to create Password Hash! Critical Error!");
    }
    userRepository.save(user);
    ModelAndView mav = new ModelAndView();
    mav.setViewName("platform");
    mav.addObject("title", sysConfigRepository.findByKey(Consts.KEY_APP_TITLE).getValue());
    mav.addObject("template_file", "backroom/content_main");
    mav.addObject("template_id", "content");
    HashMap<String, String> replaceables = new HashMap<>();
    replaceables.put("%USERNAME%", user.getUsername());
    mav.addObject("content_heading", messageByLocaleService.getMessage("register.page.title.success", replaceables));
    mav.addObject("content_lead", messageByLocaleService.getMessage("register.page.description.success"));
    mav.addObject("currentPageType", "info");
    return mav;
  }


}
