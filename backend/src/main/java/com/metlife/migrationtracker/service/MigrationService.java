package com.metlife.migrationtracker.service;

import com.metlife.migrationtracker.model.Component;
import com.metlife.migrationtracker.model.Environment;
import com.metlife.migrationtracker.model.MigrationItem;
import com.metlife.migrationtracker.model.Status;
import com.metlife.migrationtracker.repository.MigrationItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@Service
public class MigrationService {

    @Autowired
    private MigrationItemRepository repository;

    public List<MigrationItem> getAllMigrationItems() {
        return repository.findAll();
    }

    public List<String> getAllEaiCodes() {
        return repository.findAllDistinctEaiCodes();
    }

    public List<MigrationItem> getByEaiCode(String eaiCode) {
        return repository.findByEaiCode(eaiCode);
    }

    public MigrationItem addMigrationItem(MigrationItem item) {
        item.setLastUpdated(LocalDateTime.now());
        return repository.save(item);
    }

    public MigrationItem updateMigrationItem(Long id, MigrationItem updatedItem) {
        Optional<MigrationItem> existingItemOpt = repository.findById(id);

        if (existingItemOpt.isPresent()) {
            MigrationItem existingItem = existingItemOpt.get();
            existingItem.setStatus(updatedItem.getStatus());
            existingItem.setComments(updatedItem.getComments());
            existingItem.setUpdatedBy(updatedItem.getUpdatedBy());
            existingItem.setLastUpdated(LocalDateTime.now());
            // Update new fields
            existingItem.setActivity(updatedItem.getActivity());
            existingItem.setState(updatedItem.getState());
            existingItem.setTeamGroup(updatedItem.getTeamGroup());
            existingItem.setPlannedDate(updatedItem.getPlannedDate());
            existingItem.setCompletedOn(updatedItem.getCompletedOn());
            existingItem.setTickets(updatedItem.getTickets());

            return repository.save(existingItem);
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

    // Method to initialize a new application with all components and environments
    public void initializeApplication(String eaiCode, String username) {
        Map<Environment, List<String>> migrationSteps = new LinkedHashMap<>();
        migrationSteps.put(Environment.DEV, Arrays.asList(
            "JVM Build",
            "Code Changes",
            "New build and Deployment Script",
            "New DNS",
            "Keepalive page testing",
            "Dev Validation and Code Sign off"
        ));
        
        migrationSteps.put(Environment.INT, Arrays.asList(
            "JVM Build",
            "FW opening",
            "New build and Deployment Script",
            "New DNS",
            "Keepalive page testing",
            "INT Validation and Code Sign off"
        ));

        migrationSteps.put(Environment.QA, Arrays.asList(
            "JVM Build",
            "FW opening",
            "New build and Deployment Script",
            "New DNS",
            "Keepalive page testing",
            "QA Validation and Code Sign off"
        ));

        migrationSteps.put(Environment.PROD, Arrays.asList(
            "JVM Build",
            "FW opening",
            "New build and Deployment Script",
            "New DNS",
            "Keepalive page testing",
            "PROD Validation and Code Sign off"
        ));

        migrationSteps.put(Environment.POSTPROD, Arrays.asList(
            "Post-deployment monitoring",
            "Log validation & error checks",
            "Performance validation",
            "Business team validation",
            "Sign off & Closure"
        ));

        for (Component component : Component.values()) {
            for (Environment environment : Environment.values()) {
                List<String> activities = migrationSteps.get(environment);
                for (String activity : activities) {
                    MigrationItem item = new MigrationItem();
                    item.setEaiCode(eaiCode);
                    item.setComponent(component);
                    item.setEnvironment(environment);
                    item.setStatus(Status.TBD);
                    item.setLastUpdated(LocalDateTime.now());
                    item.setUpdatedBy(username);
                    item.setActivity(activity);
                    repository.save(item);  
                }
            }
        }
    }
}
