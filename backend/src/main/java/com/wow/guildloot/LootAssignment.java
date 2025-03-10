package com.wow.guildloot;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "loot_assignment")
public class LootAssignment {

    @Id
    @JsonProperty("id")
    @Column(name="id")
    private String id;

    @JsonProperty("player")
    @Column(name="player")
    private String player;

    @JsonProperty("date")
    @Column(name="date")
    private String date;

    @JsonProperty("time")
    @Column(name="time")
    private String time;

    @JsonProperty("itemID")
    @Column(name="item_id")
    private int itemID;

    @JsonProperty("itemString")
    @Column(name="item_string")
    private String itemString;

    @JsonProperty("response")
    @Column(name="response")
    private String response;

    @JsonProperty("votes")
    @Column(name="votes")
    private int votes;

    @JsonProperty("class")
    @Column(name="class")
    private String playerClass;

    @JsonProperty("instance")
    @Column(name="instance")
    private String instance;

    @JsonProperty("boss")
    @Column(name="boss")
    private String boss;

    @JsonProperty("gear1")
    @Column(name="gear1")
    private String gear1;

    @JsonProperty("gear2")
    @Column(name="gear2")
    private String gear2;

    @JsonProperty("responseID")
    @Column(name="response_id")
    private int responseID;

    @JsonProperty("isAwardReason")
    @Column(name="is_award_reason")
    private String isAwardReason;

    @JsonProperty("rollType")
    @Column(name="roll_type")
    private String rollType;

    @JsonProperty("subType")
    @Column(name="sub_type")
    private String subType;

    @JsonProperty("equipLoc")
    @Column(name="equip_loc")
    private String equipLoc;

    @JsonProperty("note")
    @Column(name="note")
    private String note;

    @JsonProperty("owner")
    @Column(name="owner")
    private String owner;

    @JsonProperty("itemName")
    @Column(name="item_name")
    private String itemName;

    @JsonProperty("servertime")
    @Column(name="server_time", columnDefinition = "INTEGER")
    private long serverTime;
}
