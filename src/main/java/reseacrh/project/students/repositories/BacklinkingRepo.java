package reseacrh.project.students.repositories;

import com.sun.source.doctree.IndexTree;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import reseacrh.project.students.enteties.Backlinking;

import java.util.List;

@Repository
public interface BacklinkingRepo extends JpaRepository<Backlinking, Integer> {

    @Transactional
    void deleteBacklinkingByCandidateAndPublicationId(Long candidate, String publicationId);

    @Query(value = "SELECT * From `backlinking` where `owner_id`=?1", nativeQuery = true)
    List<Backlinking> findCandidates(Long ownerId);

    @Query(value = "SELECT publication_id FROM backlinking WHERE candidate=?1", nativeQuery = true)
    List<String> findAppliedPublicationsByUserId(Long id);
}
