package com.metlife.migrationtracker.service;

import com.metlife.migrationtracker.model.ApplicationDetails;
import com.metlife.migrationtracker.repository.ApplicationDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationDetailsService {

    @Autowired
    private ApplicationDetailsRepository repository;

    public List<ApplicationDetails> getAllApplications() {
        return repository.findAll();
    }

    public ApplicationDetails getByEaiCode(String eaiCode) {
        return repository.findByEaiCode(eaiCode);
    }

    public ApplicationDetails addApplication(ApplicationDetails details) {
        details.setCreatedDate(LocalDateTime.now());
        details.setLastUpdated(LocalDateTime.now());
        return repository.save(details);
    }

    public ApplicationDetails updateApplication(Long id, ApplicationDetails updatedDetails) {
        ApplicationDetails existingDetails = repository.findById(id).orElse(null);

        if (existingDetails != null) {
            existingDetails.setApplicationName(updatedDetails.getApplicationName());
            existingDetails.setOwner(updatedDetails.getOwner());
            existingDetails.setTarget(updatedDetails.getTarget());
            existingDetails.setIs_critical_app(updatedDetails.getIs_critical_app());
            existingDetails.setIs_ae_app(updatedDetails.getIs_ae_app());
            existingDetails.setIs_external_app(updatedDetails.getIs_external_app());
            existingDetails.setLastUpdated(LocalDateTime.now());
            return repository.save(existingDetails);
        }

        return null;
    }

    public boolean deleteById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
