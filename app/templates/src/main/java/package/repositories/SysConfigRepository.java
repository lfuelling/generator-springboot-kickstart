package <%=packageName%>.repositories;

import <%=packageName%>.entities.Config;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Database repo for the configuration of this app.
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
public interface SysConfigRepository extends MongoRepository<Config, String> {
    Config findByKey(String key);
}
