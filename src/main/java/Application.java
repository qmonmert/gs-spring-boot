import model.Role;
import model.Tweet;
import model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import repository.TweetRepository;
import repository.UserRepository;

import java.util.Date;

@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = {"controller", "repository"})
@EnableMongoRepositories
@EnableSpringDataWebSupport
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

    @Bean
    public InitializingBean populateUsersDatabase(final UserRepository userRepository, final TweetRepository tweetRepository) {
        InitializingBean initializingBean = new InitializingBean() {
            @Override
            public void afterPropertiesSet() throws Exception {
                if (true) {
                    User admin = userRepository.save(new User("admin", "admin", "Monmert", "Quentin", "quentin.monmert@gmail.com", Role.ADMIN.toString()));
                    User user1 = userRepository.save(new User("user1", "pass1", "Monmert", "Thibaud", "thibaud.monmert@gmail.com", Role.USER.toString()));
                    userRepository.save(new User("user2", "pass2", "Monmert", "Gautier", "g.monmert@gmail.com", Role.USER.toString()));

                    tweetRepository.save(new Tweet("My first tweet !!!", new Date(), admin));
                    tweetRepository.save(new Tweet("My second tweet !!!", new Date(), admin));
                    tweetRepository.save(new Tweet("Hello :=)", new Date(), user1));
                }
            }
        };
        return initializingBean;
    }

}
