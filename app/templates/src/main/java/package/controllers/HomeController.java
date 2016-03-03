package <%=packageName%>.controllers;

import <%=packageName%>.Consts;
import <%=packageName%>.MessageByLocaleService;
import <%=packageName%>.entities.User;
import <%=packageName%>.repositories.SysConfigRepository;
import <%=packageName%>.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;

/**
 * Handles the Homepage.
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
@Controller
@EnableAutoConfiguration
public class HomeController {

    @Autowired
    private SysConfigRepository sysConfigRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageByLocaleService messageByLocaleService;

    /**
     * Builds the homepage.
     * @return the home mav
     */
    @RequestMapping("/")
    ModelAndView home() {
        ModelAndView mav = new ModelAndView();
        // Use the templates/platform.html template
        mav.setViewName("platform");
        String appTitle = sysConfigRepository.findByKey(Consts.KEY_APP_TITLE).getValue();
        mav.addObject("title", appTitle);
        // Use the landing page for non-logged in users
        mav.addObject("template_file", "reception/content_landing");
        mav.addObject("template_id", "content");
        // add the app title to the replaceables hashmap
        HashMap<String, String> replaceables = new HashMap<>();
        replaceables.put("%APPNAME%", appTitle);
        // render the Homepage title while replacing %APPNAME% with the actual appname
        mav.addObject("content_heading", messageByLocaleService.getMessage("home.page.title", replaceables));
        // the description contains no variables, so we don't need to pass the hashmap here.
        mav.addObject("content_lead", messageByLocaleService.getMessage("home.page.description"));
        // add the current user (if it's null, I don't care)
        mav.addObject("current_user", getCurrentUser());
        return mav;
    }

  @RequestMapping("/in")
  ModelAndView platform() {
    ModelAndView mav = new ModelAndView();
    // Use the templates/platform.html template
    mav.setViewName("platform");
    String appTitle = sysConfigRepository.findByKey(Consts.KEY_APP_TITLE).getValue();
    mav.addObject("title", appTitle);
    // Use the landing page for non-logged in users
    mav.addObject("template_file", "backroom/content_main");
    mav.addObject("template_id", "content");
    // add the app title to the replaceables hashmap
    HashMap<String, String> replaceables = new HashMap<>();
    replaceables.put("%APPNAME%", appTitle);
    // render the Homepage title while replacing %APPNAME% with the actual appname
    mav.addObject("content_heading", messageByLocaleService.getMessage("home.page.title", replaceables));
    // the description contains no variables, so we don't need to pass the hashmap here.
    mav.addObject("content_lead", messageByLocaleService.getMessage("home.page.description"));
    // add the current user (if it's null, I don't care)
    mav.addObject("current_user", getCurrentUser());
    return mav;
  }

    /**
     * Returns the current user.
     * @return the current user
     */
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(authentication.getName());
    }


}
