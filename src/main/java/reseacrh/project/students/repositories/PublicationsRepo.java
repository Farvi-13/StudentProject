package reseacrh.project.students.repositories;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import reseacrh.project.students.enteties.Publication;

import java.util.List;


@Repository
public interface PublicationsRepo extends MongoRepository<Publication, ObjectId> {
    Publication findPublicationByImdbId(String id);

    @Query("{'imdbId' : {$in: ?0}}")
    List<Publication> findMyReviews(List<String> imdbIds);

    @Query("{'userId' : ?0}")
    List<Publication> findMyPublications(Long ownerId);
}
