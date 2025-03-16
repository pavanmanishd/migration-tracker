package com.metlife.migrationtracker.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ApplicationDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eaiCode;
    private String applicationName;
    private String owner;
    private String target;
    private Boolean is_critical_app;
    private Boolean is_ae_app;
    private Boolean is_external_app;
    private LocalDateTime createdDate;
    private LocalDateTime lastUpdated;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEaiCode() {
        return eaiCode;
    }

    public void setEaiCode(String eaiCode) {
        this.eaiCode = eaiCode;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Boolean getIs_critical_app() {
        return is_critical_app;
    }

    public void setIs_critical_app(Boolean is_critical_app) {
        this.is_critical_app = is_critical_app;
    }

    public Boolean getIs_ae_app() {
        return is_ae_app;
    }

    public void setIs_ae_app(Boolean is_ae_app) {
        this.is_ae_app = is_ae_app;
    }

    public Boolean getIs_external_app() {
        return is_external_app;
    }

    public void setIs_external_app(Boolean is_external_app) {
        this.is_external_app = is_external_app;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
