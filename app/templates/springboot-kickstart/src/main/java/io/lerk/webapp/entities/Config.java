package io.lerk.webapp.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
@Document
public class Config {
    @Id
    private String id;

    private String key;
    private String value;

    public Config() {
    }

    public Config(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Config{" +
                "id='" + id + '\'' +
                ", key='" + key + '\'' +
                ", value=" + value +
                '}';
    }

    /**
     * Sets given value and returns itself. Makes updating existing settings a lot easier.
     * @param value the value to set
     * @return this
     */
    public Config setValueAndReturn(String value) {
        this.value = value;
        return this;
    }
}
