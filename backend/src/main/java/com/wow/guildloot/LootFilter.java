package com.wow.guildloot;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LootFilter {
    @JsonProperty("player")
    private String player;

    @JsonProperty("date")
    private String date;

    @JsonProperty("item_id")
    private String itemId;

    @JsonProperty("class")
    private String playerClass;

    @JsonProperty("equip_loc")
    private String equipLoc;
}
