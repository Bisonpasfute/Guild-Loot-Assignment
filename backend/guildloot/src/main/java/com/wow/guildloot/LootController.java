package com.wow.guildloot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loot")
public class LootController {

    @Autowired
    LootAssignmentService lootAssignmentService;

    @PostMapping("/assign")
    public ResponseEntity<String> assignLoot(@RequestBody List<LootAssignment> lootAssignment) {
        lootAssignmentService.addLootAssignments(lootAssignment);
        return ResponseEntity.ok(lootAssignment.toString());
    }

    @GetMapping("/search")
    public ResponseEntity<List<LootAssignment>> search(@RequestBody LootFilter lootFilter) {
        List<LootAssignment> lootAssignments = lootAssignmentService.search(lootFilter);
        return ResponseEntity.ok(lootAssignments);
    }
}
