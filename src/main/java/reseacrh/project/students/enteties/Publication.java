package reseacrh.project.students.enteties;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

@Document(collection="publications")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Publication {
    @Id
    private ObjectId id;
    private String imdbId = String.valueOf(UUID.randomUUID());
    private String date;
    private String title;
    private String description;
    private List<String> requirements;
    private Long userId;
    private Long moderatorId;
    private String status;
    private int views;

    public Publication(String date, String title, String description, List<String> requirements,
                       Long userId, Long moderatorId, String status, int views) {
        this.date = date;
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.userId = userId;
        this.moderatorId = moderatorId;
        this.status = status;
        this.views = views;
    }
}
