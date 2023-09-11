package reseacrh.project.students.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseacrh.project.students.enteties.Backlinking;
import reseacrh.project.students.enteties.Publication;
import reseacrh.project.students.enteties.Resume;
import reseacrh.project.students.repositories.BacklinkingRepo;
import reseacrh.project.students.repositories.PublicationsRepo;
import reseacrh.project.students.repositories.ResumeRepo;
import reseacrh.project.students.responses.Review;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BacklinkingService {

    private final BacklinkingRepo backlinkingRepo;
    private final ResumeRepo resumeRepo;
    private final PublicationsRepo publicationsRepo;

    @Autowired
    public BacklinkingService(BacklinkingRepo backlinkingRepo, ResumeRepo resumeRepo, PublicationsRepo publicationsRepo){
        this.backlinkingRepo = backlinkingRepo;
        this.resumeRepo = resumeRepo;
        this.publicationsRepo = publicationsRepo;
    }

    public Backlinking saveApplyForPublication(Backlinking backlinking){
        Publication currentPubl = publicationsRepo.findPublicationByImdbId(backlinking.getPublicationId());
        backlinking.setOwnerId(currentPubl.getUserId());
        return backlinkingRepo.save(backlinking);
    }

    public List<Review> getRespondents(Long id) {

        List<Backlinking> backlinkingArrayList = backlinkingRepo.findCandidates(id);
        return getReviews(backlinkingArrayList);
    }

    public Boolean decline(Long userId, String imdbId){
        backlinkingRepo.deleteBacklinkingByCandidateAndPublicationId(userId, imdbId);
        return true;
    }

    private List<Review> getReviews(List<Backlinking> backlinkings){
        List<Review> reviews = new ArrayList<>();

        for (Backlinking response: backlinkings) {
            Optional<Resume> currentResume =  resumeRepo.findResumeByOwnerId(response.getCandidate());
            Publication currentPublication = publicationsRepo.findPublicationByImdbId(response.getPublicationId());
            reviews.add(new Review(currentPublication.getImdbId(), currentResume.get().getImdbId(), currentPublication.getTitle(),
                    currentResume.get().getFullName(), response.getMessage()));
        }

        return reviews;
    }
}
