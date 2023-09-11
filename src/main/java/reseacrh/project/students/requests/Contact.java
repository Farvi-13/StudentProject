package reseacrh.project.students.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Contact {

    private String messangerName;
    private String messangerCode;
    private Long user_id;

}
