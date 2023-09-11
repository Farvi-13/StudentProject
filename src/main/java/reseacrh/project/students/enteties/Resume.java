package reseacrh.project.students.enteties;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Document(collection="resumes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    @Id
    private ObjectId id;
    private String imdbId = String.valueOf(UUID.randomUUID());
    private Long ownerId;
    private List<String> languages;
    private String fullName;
    private int age;
    private List<String> skills;
    private String aboutMe;
    private String goals;

    public Resume(Long ownerId, List<String> languages, String fullName, int age, List<String> skills, String aboutMe, String goals) {
        this.ownerId = ownerId;
        this.languages = languages;
        this.fullName = fullName;
        this.age = age;
        this.skills = skills;
        this.aboutMe = aboutMe;
        this.goals = goals;
    }
}
