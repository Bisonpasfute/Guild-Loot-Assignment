import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the LootAssignment model if necessary
export interface LootAssignment {
  id: string;
  player: string;
  date: string;
  time: string;
  itemID: number;
  itemString: string;
  response: string;
  votes: number;
  playerClass: string;   // Corresponds to "class" field in Java (renamed due to JavaScript reserved word)
  instance: string;
  boss: string;
  gear1: string;
  gear2: string;
  responseID: number;
  isAwardReason: string;
  rollType: string;
  subType: string;
  equipLoc: string;
  note: string;
  owner: string;
  itemName: string;
  serverTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class LootAssignmentService {
  private apiUrl = 'http://localhost:8080/import';  // Replace with your actual endpoint URL

  constructor(private http: HttpClient) {}

  // POST method to send loot assignments to the backend
  assignLoot(lootAssignments: LootAssignment[]): Observable<string> {
    return this.http.post<string>(this.apiUrl, lootAssignments);
  }
}
