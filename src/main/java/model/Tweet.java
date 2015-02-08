package model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by Quentin on 06/02/15.
 */
@Document(collection = "T_TWEET")
public class Tweet implements Serializable {

    @Id
    private String id;

    private String content;

    private Date date;

    private User user;

    public Tweet() {
    }

    public Tweet(String id, String content, Date date, User user) {
        this.id = id;
        this.content = content;
        this.date = date;
        this.user = user;
    }

    public Tweet(String content, Date date, User user) {
        this.content = content;
        this.date = date;
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
