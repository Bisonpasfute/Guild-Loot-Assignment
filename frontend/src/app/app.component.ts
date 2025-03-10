import { Component, ViewChild, TemplateRef, AfterViewInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';  // Make sure MatDialog is imported
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-root',
  imports: [MatDialogModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tableData = []; // Data to display in the table
  filteredData = []; // Data after applying filters
  filters = {}; // Store column filters
  tableColumns = [
    { name: 'Item Name', field: 'itemName' },
    { name: 'Owner', field: 'owner' },
    { name: 'Date', field: 'date' },
    { name: 'Value', field: 'value' }
  ];
  jsonInput = ''; // Store pasted JSON string

  @ViewChild('importDialog') importDialog!: TemplateRef<any>;

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
            this.tableData = jsonData; // Set table data to the uploaded JSON
            this.filteredData = jsonData;
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
