package repository;

import model.Tweet;
import model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Tweet entity.
 */
public interface TweetRepository extends MongoRepository<Tweet, String> {

    List<Tweet> findByUser(User user);

}
