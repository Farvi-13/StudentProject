package reseacrh.project.students.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reseacrh.project.students.enteties.Resume;
import reseacrh.project.students.requests.Decline;
import reseacrh.project.students.responses.Review;
import reseacrh.project.students.services.BacklinkingService;
import reseacrh.project.students.services.ResumeService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/resume")
public class ResumeController {
    private final ResumeService resumeService;
    private final BacklinkingService backlinkingService;

    @Autowired
    public ResumeController(ResumeService resumeService, BacklinkingService backlinkingService) {
        this.resumeService = resumeService;
        this.backlinkingService = backlinkingService;
    }

    @PostMapping("/add")
    public ResponseEntity<Resume> addResume(@RequestBody Resume resume) {
        return new ResponseEntity<>(resumeService.newResume(resume), HttpStatus.CREATED);
    }

    @GetMapping("/current/{resumeId}")
    public ResponseEntity<Resume> getResume(@PathVariable String resumeId) {
        return new ResponseEntity<>(resumeService.getResumeByImdbId(resumeId), HttpStatus.OK);
    }

    @GetMapping("/is/{id}")
    public ResponseEntity<Boolean> isResume(@PathVariable Long id){
        return new ResponseEntity<>(resumeService.doesUserHaveResume(id), HttpStatus.OK);
    }

    @GetMapping("/reviews/{id}")
    public ResponseEntity<List<Review>> getAllReviews(@PathVariable Long id) {
        List<Review> respondents = backlinkingService.getRespondents(id);
        return new ResponseEntity<>(respondents, HttpStatus.OK);
    }

    @PostMapping("/reviews/delete")
    public ResponseEntity<Boolean> decline(@RequestBody Decline decline){
        return new ResponseEntity<>(backlinkingService.decline(decline.getUserId(), decline.getImdbId()), HttpStatus.OK);
    }
}
