package reseacrh.project.students.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    private String publicationId;
    private String resumeId;
    private String title;
    private String fullName;
    private String message;
}
