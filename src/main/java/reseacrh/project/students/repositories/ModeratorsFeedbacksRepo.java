package reseacrh.project.students.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reseacrh.project.students.enteties.ModeratorsFeedbacks;

@Repository
public interface ModeratorsFeedbacksRepo extends JpaRepository<ModeratorsFeedbacks, Integer> {
}
