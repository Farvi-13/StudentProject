package reseacrh.project.students.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseacrh.project.students.enteties.Publication;
import reseacrh.project.students.enteties.PublicationReports;
import reseacrh.project.students.repositories.PublicationReportsRepo;

@Service
public class PublicationReportsService {

    private final PublicationReportsRepo publicationReportsRepo;

    @Autowired
    public PublicationReportsService(PublicationReportsRepo publicationReportsRepo){
        this.publicationReportsRepo = publicationReportsRepo;
    }


    public PublicationReports reportPublication(PublicationReports publicationReports){
        return publicationReportsRepo.save(publicationReports);
    }
}
