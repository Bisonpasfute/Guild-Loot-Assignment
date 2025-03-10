import { Component, ViewChild, TemplateRef, AfterViewInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';  // Make sure MatDialog is imported
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'

export interface LootAssignment {
  id: string;
  player: string;
  date: string;
  time: string;
  itemID: number;
  itemString: string;
  response: string;
  votes: number;
  class: string;
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
  servertime: number;
}

@Component({
  selector: 'app-root',
  imports: [MatDialogModule, FormsModule, MatPaginatorModule, MatTableModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataSource: MatTableDataSource<LootAssignment> = new MatTableDataSource<LootAssignment>(); // Set type here
  displayedColumns = ['player', 'date', 'itemID', 'class'];
  jsonInput = ''; // Store pasted JSON string

  @ViewChild('importDialog') importDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.searchDatabase();
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // Inject HttpClient and MatDialog
  constructor(private http: HttpClient, private dialog: MatDialog) {} // Inject MatDialog here

  // Open the Import Dialog
  openImportDialog() {
    const dialogRef = this.dialog.open(this.importDialog);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result here
      }
    });
  }

  // Handle File Upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const jsonData = JSON.parse(reader.result as string);
      this.jsonInput = JSON.stringify(jsonData); // Set the content of the file into the text area
    };
  }

  searchDatabase() {
    const params = new HttpParams()

    this.http.get('http://localhost:8080/loot/search', {
      observe: 'response',
      params: params
    }).subscribe(
      (response: any) => {
        // Log the full response to debug
        console.log('Response:', response);
        if (response.status === 200) {
          // Access the response body (which is now a structured JSON)
          const responseBody = response.body;
          console.log('Response body:', responseBody);
          const data: LootAssignment[] = responseBody;
          this.dataSource = new MatTableDataSource<LootAssignment>(data); // Set table data to the uploaded JSON
          this.dataSource.paginator = this.paginator; // Re-assign paginator
        } else {
          console.error('Unexpected response status:', response.status);
          alert('Failed to upload JSON!');
        }
      },
      (error: any) => {
        console.error('Error uploading JSON:', error);
        alert('Failed to upload JSON!');
      }
    );
  }

  // Upload the JSON to the Backend
  uploadJson() {
    if (!this.jsonInput) {
      alert('Please provide valid JSON data!');
      return;
    }

    try {
      const jsonData = JSON.parse(this.jsonInput); // Parse the pasted JSON
      this.http.post('http://localhost:8080/loot/import', jsonData, { observe: 'response' }).subscribe(
        (response: any) => {
          // Log the full response to debug
          console.log('Response:', response);

          if (response.status === 200) {
            // Access the response body (which is now a structured JSON)
            const responseBody = response.body;
            console.log('Response body:', responseBody);

            // You can use responseBody to get the message, processedCount, etc.
            console.log('Loot assignments uploaded successfully:', responseBody.message);
            this.closeDialog(); // Close the dialog after successful upload
            const data : LootAssignment[] = jsonData;
            console.log(data);
            this.dataSource = new MatTableDataSource<LootAssignment>(data); // Set table data to the uploaded JSON
            this.dataSource.paginator = this.paginator; // Re-assign paginator
          } else {
            console.error('Unexpected response status:', response.status);
            alert('Failed to upload JSON!');
          }
        },
        (error: any) => {
          console.error('Error uploading JSON:', error);
          alert('Failed to upload JSON!');
        }
      );
    } catch (error) {
      alert('Invalid JSON format. Please check your input!');
    }
  }

  // Close the dialog
  closeDialog() {
    this.dialog.closeAll();
  }
}
