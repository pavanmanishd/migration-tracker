package com.metlife.migrationtracker.repository;

import com.metlife.migrationtracker.model.MigrationItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MigrationItemRepository extends JpaRepository<MigrationItem, Long> {
    List<MigrationItem> findByEaiCode(String eaiCode);
    
    @Query("SELECT DISTINCT m.eaiCode FROM MigrationItem m")
    List<String> findAllDistinctEaiCodes();
}

