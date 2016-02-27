package io.lerk.webapp.entities;

import io.lerk.webapp.Consts;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Lukas F&uuml;lling (lukas@k40s.net)
 */
public class SystemSettings {
    private String applicationTitle, adminTermHelp, termHelp;
    private boolean registrationPublic;

    public SystemSettings() {}

    public SystemSettings(String applicationTitle, String adminTermHelp, String termHelp, boolean registrationPublic) {
        this.applicationTitle = applicationTitle;
        this.adminTermHelp = adminTermHelp;
        this.termHelp = termHelp;
        this.registrationPublic = registrationPublic;
    }

    public List<Config> getConfigList() {
        ArrayList<Config> configList = new ArrayList<>();
        configList.add(new Config(Consts.KEY_ADMIN_HELP, adminTermHelp));
        configList.add(new Config(Consts.KEY_APP_TITLE, applicationTitle));
        configList.add(new Config(Consts.KEY_TERM_HELP, termHelp));
        configList.add(new Config(Consts.KEY_REGISTER_PUBLIC, Boolean.toString(registrationPublic)));
        return configList;
    }

    public String getApplicationTitle() {
        return applicationTitle;
    }

    public void setApplicationTitle(String applicationTitle) {
        this.applicationTitle = applicationTitle;
    }

    public String getAdminTermHelp() {
        return adminTermHelp;
    }

    public void setAdminTermHelp(String adminTermHelp) {
        this.adminTermHelp = adminTermHelp;
    }

    public String getTermHelp() {
        return termHelp;
    }

    public void setTermHelp(String termHelp) {
        this.termHelp = termHelp;
    }

    public boolean isRegistrationPublic() {
        return registrationPublic;
    }

    public void setRegistrationPublic(boolean registrationPublic) {
        this.registrationPublic = registrationPublic;
    }
}
