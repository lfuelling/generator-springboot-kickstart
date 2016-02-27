package io.lerk.webapp.repositories;

import io.lerk.webapp.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);

    User findById(String id);
}
