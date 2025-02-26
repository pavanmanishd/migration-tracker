package com.metlife.migrationtracker.controller;

import com.metlife.migrationtracker.model.MigrationItem;
import com.metlife.migrationtracker.service.MigrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/migration")
@CrossOrigin
public class MigrationController {
    
    @Autowired
    private MigrationService service;
    
    @GetMapping
    public ResponseEntity<List<MigrationItem>> getAllMigrationItems() {
        return new ResponseEntity<>(service.getAllMigrationItems(), HttpStatus.OK);
    }
    
    @GetMapping("/eaicodes")
    public ResponseEntity<List<String>> getAllEaiCodes() {
        return new ResponseEntity<>(service.getAllEaiCodes(), HttpStatus.OK);
    }
    
    @GetMapping("/{eaiCode}")
    public ResponseEntity<List<MigrationItem>> getByEaiCode(@PathVariable String eaiCode) {
        return new ResponseEntity<>(service.getByEaiCode(eaiCode), HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<MigrationItem> addMigrationItem(@RequestBody MigrationItem item) {
        return new ResponseEntity<>(service.addMigrationItem(item), HttpStatus.CREATED);
    }
    
    @PostMapping("/initialize")
    public ResponseEntity<String> initializeApplication(@RequestParam String eaiCode, @RequestParam String username) {
        service.initializeApplication(eaiCode, username);
        return new ResponseEntity<>("Application initialized successfully", HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MigrationItem> updateMigrationItem(@PathVariable Long id, @RequestBody MigrationItem item) {
        MigrationItem updatedItem = service.updateMigrationItem(id, item);
        
        if (updatedItem != null) {
            return new ResponseEntity<>(updatedItem, HttpStatus.OK);
        }
        
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMigrationItem(@PathVariable Long id) {
        boolean deleted = service.deleteById(id);
        
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

