package reseacrh.project.students.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import reseacrh.project.students.enteties.Contacts;

@Repository
public interface ContactsRepo extends JpaRepository<Contacts, Long> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM contacts WHERE messanger_name = ?1 AND user = ?2",
            nativeQuery = true)
    void deleteContactsByMessangerNameAndUser(String messangerName, Long user);

}
