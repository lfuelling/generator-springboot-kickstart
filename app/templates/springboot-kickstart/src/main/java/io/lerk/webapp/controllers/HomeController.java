package io.lerk.webapp.controllers;

import io.lerk.webapp.Consts;
import io.lerk.webapp.MessageByLocaleService;
import io.lerk.webapp.Utils;
import io.lerk.webapp.entities.User;
import io.lerk.webapp.repositories.SysConfigRepository;
import io.lerk.webapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;

/**
 * Handles the homepage.
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
        mav.setViewName("home");
        String appTitle = sysConfigRepository.findByKey(Consts.KEY_APP_TITLE).getValue();
        mav.addObject("title", appTitle);
        mav.addObject("template_file", "reception/content_landing");
        mav.addObject("template_id", "content");
        HashMap<String, String> replaceables = new HashMap<>();
        replaceables.put("%APPNAME%", appTitle);
        mav.addObject("content_heading", messageByLocaleService.getMessage("home.page.title", replaceables));
        mav.addObject("content_lead", messageByLocaleService.getMessage("home.page.description"));
        mav.addObject("current_user", getCurrentUser());
        mav.addObject("greeting", Utils.getGreeting());
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
