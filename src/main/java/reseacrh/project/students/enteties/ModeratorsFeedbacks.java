package reseacrh.project.students.enteties;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class ModeratorsFeedbacks implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private int id;
    private Long moderatorId;
    private int publicationId;
    private String text;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_moderator_feedback_id")
    private User user;


    public ModeratorsFeedbacks() {
    }

    public ModeratorsFeedbacks(int id, Long moderatorId, int publicationId, String text, User user) {
        this.id = id;
        this.moderatorId = moderatorId;
        this.publicationId = publicationId;
        this.text = text;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Long getModeratorId() {
        return moderatorId;
    }

    public void setModerator_id(Long moderatorId) {
        this.moderatorId = moderatorId;
    }

    public int getPublicationId() {
        return publicationId;
    }

    public void setPublicationId(int publicationId) {
        this.publicationId = publicationId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
