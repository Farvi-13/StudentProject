package reseacrh.project.students.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reseacrh.project.students.enteties.Publication;
import reseacrh.project.students.enteties.User;
import reseacrh.project.students.requests.Contact;
import reseacrh.project.students.services.ProfileService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;


    @GetMapping("/{id}")
    public ResponseEntity<User> getCurrentUser(@PathVariable Long id){
        return new ResponseEntity<>(profileService.getCurrentUser(id), HttpStatus.OK);
    }

    @GetMapping("/number/{id}")
    public ResponseEntity<String> getNumber(@PathVariable Long id){
        return new ResponseEntity<>(profileService.getPhoneNumber(id), HttpStatus.OK);
    }

    @GetMapping("/publications/{id}")
    public ResponseEntity<List<Publication>> getPublications(@PathVariable Long id){
        List<Publication> myPublications = profileService.getMyPublications(id);
        return new ResponseEntity<>(myPublications, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<User> changeUser(@RequestBody User user){
        return new ResponseEntity<>(profileService.changeUser(user), HttpStatus.OK);
    }

    @GetMapping("/reviews/{id}")
    public ResponseEntity<List<Publication>> getReviews(@PathVariable Long id) {
        return new ResponseEntity<>(profileService.getMyReviews(id), HttpStatus.OK);
    }

    @PostMapping("/contacts")
    public ResponseEntity<List<Contact>> setContacts(@RequestBody List<Contact> contacts){
        return new ResponseEntity<>(profileService.setContacts(contacts), HttpStatus.CREATED);
    }
}
