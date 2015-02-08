package repository;

import model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the User entity.
 */
public interface UserRepository extends MongoRepository<User, String> {

    User findOneByLogin(String login);
    User findOneByPassword(String password);
    User findOneByLastName(String lastName);
    User findOneByFirstName(String firstName);
    User findOneByEmail(String email);

    List<User> findByLoginAndPassword(String login, String password);

}
