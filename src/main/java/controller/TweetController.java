package controller;

import model.Tweet;
import model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import repository.TweetRepository;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

/**
 * Created by Quentin on 06/02/15.
 */
@RestController
@RequestMapping("/tweet")
public class TweetController {

    private final Logger log = LoggerFactory.getLogger(TweetController.class);

    @Inject
    TweetRepository tweetRepository;

    @RequestMapping(value = "/getAll",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Tweet> getAll() {
        log.info("Request : /tweet/getAll");
        List<Tweet> query = tweetRepository.findAll();
        return query;
    }

    @RequestMapping(value = "/getByUser/{user}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Tweet> getByUser(@PathVariable User user) {
        log.info("Request : /tweet/getByUser/{user}");
        List<Tweet> query = tweetRepository.findByUser(user);
        return query;
    }

    @RequestMapping(value = "/post/{user}",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void post(@RequestBody Tweet tweet, @PathVariable User user) {
        tweet.setUser(user);
        tweet.setDate(new Date());
        tweetRepository.save(tweet);
    }

    @RequestMapping(value = "/delete/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void delete(@PathVariable String id) {
        tweetRepository.delete(id);
    }


}
