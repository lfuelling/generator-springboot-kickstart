package io.lerk.webapp.controllers;

import io.lerk.webapp.Consts;
import io.lerk.webapp.MessageByLocaleService;
import io.lerk.webapp.Utils;
import io.lerk.webapp.repositories.SysConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;


/**
 * Handles any error.
 *
 * @author Lukas F&uuml;lling (l.fuelling@micromata.de)
 */
@Controller
@EnableAutoConfiguration
public class AppErrorController implements ErrorController {

  private static final String PATH = "/error";

  @Autowired
  private SysConfigRepository sysConfigRepository;

  @Autowired
  private MessageByLocaleService messageByLocaleService;

  private final ErrorAttributes errorAttributes;

  @Autowired
  public AppErrorController(ErrorAttributes errorAttributes) {
    Assert.notNull(errorAttributes, "ErrorAttributes must not be null.");
    this.errorAttributes = errorAttributes;
  }

  /**
   * Builds the error view.
   *
   * @param aRequest the failed request
   * @return the error mav
   */
  @RequestMapping(PATH)
  ModelAndView error(HttpServletRequest aRequest) {
    RequestAttributes requestAttributes = new ServletRequestAttributes(aRequest);
    ModelAndView mav = new ModelAndView();
    mav.setViewName("home");
    mav.addObject("title", sysConfigRepository.findByKey(Consts.KEY_APP_TITLE).getValue() + " - " + messageByLocaleService.getMessage("platform.error.page.title"));
    mav.addObject("template_file", "error");
    mav.addObject("template_id", "content");
    mav.addObject("current_user", "");
    mav.addObject("greeting", Utils.getGreeting());
    mav.addObject("error_attrs", errorAttributes.getErrorAttributes(requestAttributes, getTraceParameter(aRequest)));
    return mav;
  }

  private boolean getTraceParameter(HttpServletRequest request) {
    String parameter = request.getParameter("trace");
    return parameter != null && !"false".equals(parameter.toLowerCase());
  }

  @Override
  public String getErrorPath() {
    return PATH;
  }

  public ErrorAttributes getErrorAttributes() {
    return errorAttributes;
  }

}
