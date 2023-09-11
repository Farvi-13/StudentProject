package reseacrh.project.students.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseacrh.project.students.enteties.Resume;
import reseacrh.project.students.repositories.ResumeRepo;

import java.util.List;
import java.util.Optional;

@Service
public class ResumeService {
    private final ResumeRepo resumeRepo;

    @Autowired
    public ResumeService(ResumeRepo resumeRepo) {
        this.resumeRepo = resumeRepo;
    }

    public Resume newResume(Resume resume) {

        Optional<Resume> isResume = resumeRepo.findResumeByOwnerId(resume.getOwnerId());
        if (isResume.isPresent()){
            resume.setId(isResume.get().getId());
            return resumeRepo.save(resume);
        }
        return resumeRepo.save(resume);
    }

    public Resume getResumeByImdbId(String imdbId) {
        return resumeRepo.findResumeByImdbId(imdbId);
    }

    public Boolean doesUserHaveResume(Long id){
        Optional<Resume> resume = resumeRepo.findResumeByOwnerId(id);
        return resume.isPresent();
    }

    public List<Resume> getAllResume(List<Long> usersId) {
        return resumeRepo.findResumes(usersId);
    }
}
