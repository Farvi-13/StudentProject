package reseacrh.project.students.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reseacrh.project.students.enteties.Contacts;
import reseacrh.project.students.enteties.Publication;
import reseacrh.project.students.enteties.Role;
import reseacrh.project.students.repositories.BacklinkingRepo;
import reseacrh.project.students.repositories.ContactsRepo;
import reseacrh.project.students.repositories.PublicationsRepo;
import reseacrh.project.students.enteties.User;
import reseacrh.project.students.repositories.UserRepo;
import reseacrh.project.students.requests.Contact;

import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final PublicationsRepo publicationsRepo;
    private final UserRepo userRepo;
    private final BacklinkingRepo backlinkingRepo;
    private final PasswordEncoder passwordEncoder;
    private final ContactsRepo contactsRepo;


    public List<Publication> getMyReviews(Long id) {
        List<String> imdbIds = backlinkingRepo.findAppliedPublicationsByUserId(id);
        return publicationsRepo.findMyReviews(imdbIds);
    }

    public User getCurrentUser(Long id){
        return userRepo.getUserById(id);
    }

    public String getPhoneNumber(Long id){
        return userRepo.getUserById(id).getPhone();
    }

    public List<Publication> getMyPublications(Long id) {
        return publicationsRepo.findMyPublications(id);
    }

    @Transactional
    public User changeUser(User user) {
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public List<Contact> setContacts(List<Contact> contacts){
        System.out.println("1");
        for(Contact contact : contacts){
            System.out.println("2");
            contactsRepo.deleteContactsByMessangerNameAndUser(contact.getMessangerName(), contact.getUser_id());
            contactsRepo.save(
                    new Contacts(
                            contact.getMessangerName(),
                            contact.getMessangerCode(),
                            userRepo.getUserById(contact.getUser_id())
                            ));
        }
        return contacts;
    }

}
