package reseacrh.project.students.enteties;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Backlinking implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private int id;
    private String message;
    private Long candidate;
    private String publicationId;
    private Long ownerId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_backlinking_id")
    private User user;


    public Backlinking(int id, String message, Long candidate, String publicationId, Long ownerId, User user) {
        this.id = id;
        this.message = message;
        this.candidate = candidate;
        this.publicationId = publicationId;
        this.ownerId = ownerId;
        this.user = user;
    }

    public Backlinking(String message, Long candidate, String publicationId, User user) {
        this.message = message;
        this.candidate = candidate;
        this.publicationId = publicationId;
        this.user = user;
    }

    public Backlinking() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getCandidate() {
        return candidate;
    }

    public void setCandidate(Long candidate) {
        this.candidate = candidate;
    }

    public String getPublicationId() {
        return publicationId;
    }

    public void setPublicationId(String publicationId) {
        this.publicationId = publicationId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
