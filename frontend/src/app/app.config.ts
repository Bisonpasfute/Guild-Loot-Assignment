import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { routes } from './app.routes'; // Adjust the path if needed

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // Importing Angular Material modules
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,

    // Providing HttpClient for HTTP requests
    provideHttpClient(),  // This is required for HTTP client requests

    // Adding FormsModule to support ngModel
    FormsModule,  // Add this line
  ]
};
