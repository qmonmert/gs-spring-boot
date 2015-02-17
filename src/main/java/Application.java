import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import repository.TweetRepository;
import repository.UserRepository;

@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = {"controller", "repository"})
@EnableMongoRepositories
@EnableSpringDataWebSupport
@EnableCaching
public class Application {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        log.info("#########################################");
        log.info("################ START ##################");
        log.info("########### spring-boot:run #############");
        log.info("#########################################");

        ApplicationContext ctx = SpringApplication.run(Application.class, args);

        log.info("###########################################");
        log.info("################ STARTED ##################");
        log.info("############ spring-boot:run ##############");
        log.info("###########################################");
    }

    // Cache on the class UserController and TweetController
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager();
    }


    @Bean
    public InitializingBean populateUsersDatabase(final UserRepository userRepository, final TweetRepository tweetRepository) {
        InitializingBean initializingBean = new InitializingBean() {
            @Override
            public void afterPropertiesSet() throws Exception {
//                if (true) {
//                    User admin = userRepository.save(new User("admin", "admin", "Quentin", "Monmert", "quentin.monmert@gmail.com", Role.ADMIN.toString()));
//                    User user1 = userRepository.save(new User("thib", "thib", "Thibaud", "Monmert", "thibaudmonmert@gmail.com", Role.USER.toString()));
//                    userRepository.save(new User("gautier", "gautier", "Gautier", "Monmert", "g.monmert@gmail.com", Role.USER.toString()));
//                    tweetRepository.save(new Tweet("My first tweet !!!", new Date(), admin));
//                    tweetRepository.save(new Tweet("My second tweet !!!", new Date(), admin));
//                    tweetRepository.save(new Tweet("Hello :=)", new Date(), user1));
//                }
            }
        };
        return initializingBean;
    }

}
