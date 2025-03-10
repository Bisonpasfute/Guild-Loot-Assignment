package com.wow.guildloot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LootAssignmentRepository extends JpaRepository<LootAssignment, String> {

    @Query("SELECT l FROM LootAssignment l WHERE " +
            "(:player IS NULL OR l.player = :player) AND " +
            "(:date IS NULL OR l.date = :date) AND " +
            "(:itemID IS NULL OR l.itemID = :itemID) AND " +
            "(:playerClass IS NULL OR l.playerClass = :playerClass) AND " +
            "(:equipLoc IS NULL OR l.equipLoc = :equipLoc)")
    List<LootAssignment> findByFilters(@Param("player") String player,
                                 @Param("date") String date,
                                 @Param("itemID") String itemID,
                                 @Param("playerClass") String playerClass,
                                 @Param("equipLoc") String equipLoc);
}
