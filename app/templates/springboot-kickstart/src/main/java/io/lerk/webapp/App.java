package io.lerk.webapp;

import io.lerk.webapp.entities.Config;
import io.lerk.webapp.entities.User;
import io.lerk.webapp.repositories.SysConfigRepository;
import io.lerk.webapp.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.*;
import java.util.stream.Collectors;


@SpringBootApplication
public class App implements CommandLineRunner {

    Logger logger = LoggerFactory.getLogger(App.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SysConfigRepository sysConfigRepository;

    public App() {
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }


    @Override
    public void run(String... strings) throws Exception {
        logger.debug("Testing if root user exists");
        User root = userRepository.findByUsername("root");
        if (root == null) {
            logger.debug("Root user does not exist, creating a new one");
            createNewRootUser();
        } else if (Boolean.parseBoolean(System.getenv("deleteRoot"))) {
            logger.info("DeleteRoot env is set. Creating new root user...");
            userRepository.delete("0");
            createNewRootUser();
        } else {
            logger.debug("Root user found");
        }
        //
        if (Boolean.parseBoolean(System.getenv("resetSettings"))) {
            logger.info("ResetSettings is set to true. Will now restore defaults...");
            writeDefaultSettings();
        } else {
            logger.debug("Probing settings:");
            List<Config> configList = sysConfigRepository.findAll();
            if (configList.isEmpty()) {
                writeDefaultSettings();
            }
            if (!findDuplicates(configList).isEmpty()) {
                writeDefaultSettings();
            } else {
                logger.debug("Found no duplicates.");
            }
            for (Config config : configList) {
                logger.debug("Found: " + config);
            }
        }
    }

    public static <T> Set<T> findDuplicates(List<T> listContainingDuplicates) {
        final Set<T> setToReturn = new HashSet<>();
        final Set<T> set1 = new HashSet<>();
        setToReturn.addAll(listContainingDuplicates.stream().filter(yourT -> !set1.add(yourT)).collect(Collectors.toList())); //dafuq
        return setToReturn;
    }

    private void writeDefaultSettings() {
        // Set the config options
        ArrayList<Config> configList = new ArrayList<>();
        configList.add(new Config(Consts.KEY_APP_TITLE, "Webapp"));
        configList.add(new Config(Consts.KEY_REGISTER_PUBLIC, "false"));
        // Do DB stuff
        sysConfigRepository.deleteAll();
        sysConfigRepository.save(configList);
        logger.info("Settings reset to default!");
    }

    private void createNewRootUser() {
        User root = new User();
        root.setId("0");
        root.setUsername("root");
        root.setAdminState(true);
        root.setEmail("root@webapp.local");
        root.setPassword(UUID.randomUUID().toString().substring(0, 7));
        userRepository.save(root);
        logger.info("Created new root user.\n\n\tPassword: " + root.getPassword() + "\n");
    }

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver slr = new SessionLocaleResolver();
        slr.setDefaultLocale(Locale.ENGLISH);
        return slr;
    }

    @Bean
    public ReloadableResourceBundleMessageSource messageSource () {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:locale/messages");
        messageSource.setCacheSeconds(3600); // Cache for one hour
        return messageSource;
    }

}

