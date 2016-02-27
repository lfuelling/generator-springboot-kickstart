package io.lerk.webapp.repositories;

import io.lerk.webapp.entities.Config;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
public interface SysConfigRepository extends MongoRepository<Config, String> {
    Config findByKey(String key);
}
