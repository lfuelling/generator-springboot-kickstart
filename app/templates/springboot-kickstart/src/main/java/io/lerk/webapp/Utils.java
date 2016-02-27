package io.lerk.webapp;

import java.util.Random;

/**
 * @author Lukas F&uuml;lling (lukas@k40s.net)
 */
public class Utils {

    public static String getGreeting() {
        return Consts.greetings[new Random().nextInt(Consts.greetings.length)];
    }

}
