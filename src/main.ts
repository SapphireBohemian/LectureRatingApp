import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { environment } from './environments/environment';
import { initializeApp } from 'firebase/app';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  initializeApp(environment.firebaseConfig);
