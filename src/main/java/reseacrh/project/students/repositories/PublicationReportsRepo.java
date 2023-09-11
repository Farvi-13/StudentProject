package reseacrh.project.students.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import reseacrh.project.students.enteties.PublicationReports;

public interface PublicationReportsRepo extends JpaRepository<PublicationReports, Integer> {
}
