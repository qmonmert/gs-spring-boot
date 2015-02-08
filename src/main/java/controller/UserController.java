package controller;

import model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import repository.UserRepository;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by Quentin on 05/02/15.
 */
@RestController
@RequestMapping("/user")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);

    @Inject
    UserRepository userRepository;

    @RequestMapping(value = "/getById/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserById(@PathVariable String id) {
        return userRepository.findOne(id);
    }

    @RequestMapping(value = "/getByLogin/{login}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserByLogin(@PathVariable String login) {
        return userRepository.findOneByLogin(login);
    }

    @RequestMapping(value = "/getByPassword/{password}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserByPassword(@PathVariable String password) {
        return userRepository.findOneByPassword(password);
    }

    @RequestMapping(value = "/getByLastName/{lastName}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserByLastName(@PathVariable String lastName) {
        return userRepository.findOneByLastName(lastName);
    }

    @RequestMapping(value = "/getByFirstName/{firstName}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserByFirstName(@PathVariable String firstName) {
        return userRepository.findOneByFirstName(firstName);
    }

    @RequestMapping(value = "/getByEmail/{email}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserByEmail(@PathVariable String email) {
        return userRepository.findOneByEmail(email);
    }

    @RequestMapping(value = "/getAll",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<User> getall() {
        List<User> query = userRepository.findAll();
        return query;
    }

    @RequestMapping(value = "/getByLoginAndPassword/{login}/{password}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserByLoginAndPassword(@PathVariable String login, @PathVariable String password) {
        log.info("getUserByLoginAndPassword : login=" + login + ";password=" + password);
        List<User> users = userRepository.findByLoginAndPassword(login, password);
        if (users != null && users.size() > 0) {
            log.info("users not null " + users.size());
            return users.get(0);
        }
        log.info("users=" + users);
        return null;
    }

    @RequestMapping(value = "/post",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void post(@RequestBody User user) {
        userRepository.save(user);
    }

    @RequestMapping(value = "/delete/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void delete(@PathVariable String id) {
        userRepository.delete(id);
    }

}
