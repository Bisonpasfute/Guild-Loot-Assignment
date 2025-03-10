package com.wow.guildloot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LootAssignmentService {
    @Autowired
    private LootAssignmentRepository lootAssignmentRepository;

    public void addLootAssignments(List<LootAssignment> lootAssignmentList) {
        lootAssignmentList.forEach(loot -> lootAssignmentRepository.save(loot));
    }

    public List<LootAssignment> search(LootFilter lootFilter) {
        return lootAssignmentRepository.findByFilters(
                lootFilter.getPlayer(),
                lootFilter.getDate(),
                lootFilter.getItemId(),
                lootFilter.getPlayerClass(),
                lootFilter.getEquipLoc()
        );
    }
}
