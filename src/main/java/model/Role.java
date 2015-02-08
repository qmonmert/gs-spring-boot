package model;

/**
 * Created by Quentin on 08/02/15.
 */
public enum Role {

    USER("USER"), ADMIN("ADMIN");

    private String name;

    Role(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

}
