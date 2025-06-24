import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Import routes
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Enables HTTP client functionality
    provideRouter(routes), // Enables Routing
    ...appConfig.providers // Other global providers (if any)
  ]
}).catch((err) => console.error(err));
