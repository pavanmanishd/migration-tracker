package com.metlife.migrationtracker.repository;

import com.metlife.migrationtracker.model.ApplicationDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationDetailsRepository extends JpaRepository<ApplicationDetails, Long> {
    ApplicationDetails findByEaiCode(String eaiCode);
}
