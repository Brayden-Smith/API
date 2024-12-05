import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

//puts any errors in the entire app onto the console
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
