package com.metlife.migrationtracker.controller;

import com.metlife.migrationtracker.model.ApplicationDetails;
import com.metlife.migrationtracker.service.ApplicationDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin
public class ApplicationDetailsController {

    @Autowired
    private ApplicationDetailsService service;

    @GetMapping
    public ResponseEntity<List<ApplicationDetails>> getAllApplications() {
        return new ResponseEntity<>(service.getAllApplications(), HttpStatus.OK);
    }

    @GetMapping("/{eaiCode}")
    public ResponseEntity<ApplicationDetails> getByEaiCode(@PathVariable String eaiCode) {
        return new ResponseEntity<>(service.getByEaiCode(eaiCode), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ApplicationDetails> addApplication(@RequestBody ApplicationDetails details) {
        return new ResponseEntity<>(service.addApplication(details), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDetails> updateApplication(@PathVariable Long id,
            @RequestBody ApplicationDetails details) {
        ApplicationDetails updatedDetails = service.updateApplication(id, details);

        if (updatedDetails != null) {
            return new ResponseEntity<>(updatedDetails, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        boolean deleted = service.deleteById(id);

        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
