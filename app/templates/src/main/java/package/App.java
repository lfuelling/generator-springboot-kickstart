package <%=packageName%>;

  import <%=packageName%>.entities.Config;
  import <%=packageName%>.entities.User;
  import <%=packageName%>.repositories.SysConfigRepository;
  import <%=packageName%>.repositories.UserRepository;
  import org.slf4j.Logger;
  import org.slf4j.LoggerFactory;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.boot.CommandLineRunner;
  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;

  import javax.imageio.ImageIO;
  import javax.xml.bind.DatatypeConverter;
  import java.awt.*;
  import java.awt.image.BufferedImage;
  import java.io.ByteArrayOutputStream;
  import java.io.IOException;
  import java.util.*;
  import java.util.List;
  import java.util.stream.Collectors;


/**
 * This is the main application class of the webapp.
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
@SpringBootApplication
public class App implements CommandLineRunner {

  // The logger we use in this class
  Logger logger = LoggerFactory.getLogger(App.class);

  // The Database repository for users
  @Autowired
  private UserRepository userRepository;

  // The Database repository for configuration
  @Autowired
  private SysConfigRepository sysConfigRepository;

  public App() {
  }

  public static void main(String[] args) {
    // Run the springboot app
    SpringApplication.run(App.class, args);
  }


  @Override
  public void run(String... strings) throws Exception {

    // If root user isn't present or the 'deleteRoot' env is true, create a new root user and log the password
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

    // Check settings for duplicates, if 'resetSettings' env is true, write default settings
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

  /**
   * Finds duplicates in a List.
   * @param listContainingDuplicates the list to check
   * @param <T> the type of the objects inside the list
   * @return the list as set (means there are no more dupes)
     */
  public static <T> Set<T> findDuplicates(List<T> listContainingDuplicates) {
    final Set<T> setToReturn = new HashSet<>();
    final Set<T> set1 = new HashSet<>();
    setToReturn.addAll(listContainingDuplicates.stream().filter(yourT -> !set1.add(yourT)).collect(Collectors.toList())); //dafuq
    return setToReturn;
  }

  /**
   * Deletes all settings and writes default ones to db.
   */
  private void writeDefaultSettings() {
    // Set the config options
    ArrayList<Config> configList = new ArrayList<>();
    configList.add(new Config(Consts.KEY_APP_TITLE, "<%=appName%>"));
    // registration is public by default.
    configList.add(new Config(Consts.KEY_REGISTER_PUBLIC, "true"));
    // Do DB stuff
    sysConfigRepository.deleteAll();
    sysConfigRepository.save(configList);
    logger.info("Settings reset to default!");
  }

  /**
   * Creates a new root user and logs the password.
   */
  private void createNewRootUser() {
    User root = new User();
    root.setId("0");
    root.setUsername("root");
    root.setAdminState(true);
    root.setEmail("root@webapp.local");
    root.setImage(generateSomeImage());
    root.setPassword(UUID.randomUUID().toString().substring(0, 7));
    userRepository.save(root);
    logger.info("Created new root user.\n\n\tPassword: " + root.getPassword() + "\n");
  }

  private String generateSomeImage() {
    int sz = 200;
    BufferedImage image = new BufferedImage(
      sz, sz, BufferedImage.TYPE_INT_ARGB);
    // paint the image..
    Graphics2D g = image.createGraphics();
    g.setRenderingHint(
      RenderingHints.KEY_ANTIALIASING,
      RenderingHints.VALUE_ANTIALIAS_ON);
    g.setColor(Color.WHITE);
    for (int ii = 0; ii < sz; ii += 5) {
      g.draw3DRect(ii, ii, sz - ii, sz - ii, true);
    }
    g.dispose();
    // convert the image
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    try {
      ImageIO.write(image, "png", baos);
    } catch (IOException e) {
      logger.error("Unable to unable.", e);
    }
    String data = DatatypeConverter.printBase64Binary(baos.toByteArray());
    return "data:image/png;base64," + data;
  }

}

