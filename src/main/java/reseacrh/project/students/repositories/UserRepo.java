package reseacrh.project.students.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import reseacrh.project.students.enteties.Role;
import reseacrh.project.students.enteties.User;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findUserById(Long id);

    @Query(value = "UPDATE _user SET email = ?2, firstname=?3, lastname=?4, password=?5, phone=?6, role=?7 WHERE id=?1", nativeQuery = true)
    User updateUser(Integer id, String email,
                    String firstname, String lastname,
                    String password, String phone, Role role);

    @Transactional
    User getUserById(Long id);

    Optional<User> findByEmail(String Email);
}
