package io.lerk.webapp.controllers;


import io.lerk.webapp.Consts;
import io.lerk.webapp.MessageByLocaleService;
import io.lerk.webapp.Utils;
import io.lerk.webapp.entities.User;
import io.lerk.webapp.mail.MailMan;
import io.lerk.webapp.repositories.SysConfigRepository;
import io.lerk.webapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;

/**
 * This class is used to edit accounts.
 * @author Lukas F&uuml;lling (l.fuelling@micromata.de)
 */
@Controller
@EnableAutoConfiguration
public class UserController {

    @Autowired
    private SysConfigRepository sysConfigRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailMan mailMan;

    @Autowired
    MessageByLocaleService messageByLocaleService;

    /**
     * Builds the account page.
     * @return the account mav
     */
    @RequestMapping("/account")
    ModelAndView account() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("platform");
        mav.addObject("title", sysConfigRepository.findByKey(Consts.KEY_APP_TITLE).getValue());
        mav.addObject("template_file", "backroom/edit/account");
        mav.addObject("template_id", "content");
        mav.addObject("content_heading", messageByLocaleService.getMessage("user.page.account.title"));
        mav.addObject("content_lead", messageByLocaleService.getMessage("user.page.account.description"));
        mav.addObject("account_settings", true);
        mav.addObject("greeting", Utils.getGreeting());
        mav.addObject("current_user", getCurrentUser());
        return mav;
    }

    /**
     * Handles account updates.
     * @param user the user to be updated
     * @return the account mav
     */
    @RequestMapping(value = "/account/update", method = RequestMethod.POST)
    ModelAndView updateAcc(@ModelAttribute User user) {
        Assert.notNull(user, messageByLocaleService.getMessage("platform.error.user.null"));
        Assert.isTrue(getCurrentUser().getAdminState().equals(user.getAdminState()), messageByLocaleService.getMessage("platform.error.rights"));
        Assert.isTrue(getCurrentUser().getId().equals(user.getId()), messageByLocaleService.getMessage("user.error.id.changed"));
        Assert.notNull(user.getPassword(), messageByLocaleService.getMessage("user.error.password.null"));
        Assert.notNull(user.getUsername(), messageByLocaleService.getMessage("user.error.username.null"));
        User oldUsr = userRepository.findById(user.getId());
        String apptitle = sysConfigRepository.findByKey(Consts.KEY_APP_TITLE).getValue();

        HashMap<String, String> r1 = new HashMap<>();
        r1.put("%APPNAME%", apptitle);
        r1.put("%NAME%", user.getUsername());
        HashMap<String, String> r2 = new HashMap<>();
        r2.put("%APPNAME%", apptitle);
        mailMan.sendMail((oldUsr.getEmail() != null) ? oldUsr : user, messageByLocaleService.getMessage("user.mail.account.content", r1), messageByLocaleService.getMessage("user.mail.account.subject", r2));

        userRepository.save(user);
        ModelAndView mav = new ModelAndView();
        mav.setViewName("platform");
        mav.addObject("title", apptitle);
        mav.addObject("template_file", "backroom/edit/account");
        mav.addObject("template_id", "content");
        mav.addObject("content_heading", messageByLocaleService.getMessage("user.page.account.title"));
        mav.addObject("content_lead", messageByLocaleService.getMessage("user.page.account.description"));
        mav.addObject("account_settings", true);
        mav.addObject("account_updated", true);
        mav.addObject("greeting", Utils.getGreeting());
        mav.addObject("current_user", getCurrentUser());
        return mav;
    }

    /**
     * Returns the current user.
     * @return the current user
     */
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(authentication.getName());
        Assert.notNull(user, messageByLocaleService.getMessage("platform.error.user.unableToGet"));
        return user;
    }
}
