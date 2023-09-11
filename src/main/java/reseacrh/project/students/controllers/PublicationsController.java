package reseacrh.project.students.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reseacrh.project.students.enteties.Backlinking;
import reseacrh.project.students.enteties.Publication;
import reseacrh.project.students.enteties.PublicationReports;
import reseacrh.project.students.services.BacklinkingService;
import reseacrh.project.students.services.PublicationReportsService;
import reseacrh.project.students.services.PublicationService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/publications")
public class PublicationsController {

    private final PublicationService publicationService;
    private final BacklinkingService backlinkingService;
    private final PublicationReportsService publicationReportsService;

    @Autowired
    public PublicationsController(PublicationService publicationService, BacklinkingService backlinkingService, PublicationReportsService publicationReportsService) {
        this.publicationService = publicationService;
        this.backlinkingService = backlinkingService;
        this.publicationReportsService = publicationReportsService;
    }

    @PostMapping("/giver/create")
    public ResponseEntity<Publication> addPublication(@RequestBody Publication publication) {
        return new ResponseEntity<>(publicationService.newPublication(publication), HttpStatus.CREATED);
    }

    @GetMapping("/searcher")
    public ResponseEntity<List<Publication>> getAllPublications() {
        return new ResponseEntity<>(publicationService.getAllPublications(), HttpStatus.OK);
    }

    @GetMapping("/searcher/{id}")
    public ResponseEntity<Publication> getPublication(@PathVariable String id) {
        return new ResponseEntity<>(publicationService.getPublicationByImdbId(id), HttpStatus.OK);
    }

    @PostMapping("/searcher/apply")
    public ResponseEntity<Backlinking> applyForPublication(@RequestBody Backlinking backlinking){
        return new ResponseEntity<>(backlinkingService.saveApplyForPublication(backlinking), HttpStatus.OK);
    }

    @PostMapping("/searcher/report")
    public ResponseEntity<PublicationReports> reportPublication(@RequestBody PublicationReports publicationReports){
        return new ResponseEntity<>(publicationReportsService.reportPublication(publicationReports), HttpStatus.OK);
    }

    @GetMapping("/owner/{publId}")
    public ResponseEntity<Long> getPublicationOwner(@PathVariable String publId){
        return new ResponseEntity<>(publicationService.getOwnerId(publId), HttpStatus.OK);
    }

}
