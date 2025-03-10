package com.wow.guildloot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/loot")
public class LootController {

    @Autowired
    LootAssignmentService lootAssignmentService;

    @PostMapping("/import")
    public ResponseEntity<Map<String, Object>> assignLoot(@RequestBody List<LootAssignment> lootAssignment) {
        lootAssignmentService.addLootAssignments(lootAssignment);
        Map<String, Object> response = new HashMap<>();
        response.put("size", lootAssignment.size());
        response.put("lootAssignments", lootAssignment);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<LootAssignment>> search(@RequestParam(required = false) String player,
                                                       @RequestParam(required = false) String date,
                                                       @RequestParam(required = false) String itemId,
                                                       @RequestParam(required = false) String playerClass,
                                                       @RequestParam(required = false) String equipLoc
    ) {
        LootFilter lootFilter = new LootFilter();
        lootFilter.setPlayer(player);
        lootFilter.setDate(date);
        lootFilter.setItemId(itemId);
        lootFilter.setPlayerClass(playerClass);
        lootFilter.setEquipLoc(equipLoc);
        List<LootAssignment> lootAssignments = null;
        if (lootFilter.isEmpty()) {
            lootAssignments = lootAssignmentService.findAll();
        }
        else {
            lootAssignments = lootAssignmentService.search(lootFilter);
        }
        return ResponseEntity.ok(lootAssignments);
    }
}
