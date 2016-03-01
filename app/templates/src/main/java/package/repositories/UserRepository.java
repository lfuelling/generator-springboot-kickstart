package <%=packageName%>.repositories;

import <%=packageName%>.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Database repo for the users.
 * @author Lukas F&uuml;lling (lerk@lerk.io)
 */
public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);

    User findById(String id);
}
