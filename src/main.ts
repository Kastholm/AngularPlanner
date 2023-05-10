//This function allows you to dynamically bootstrap an Angular application in a web browser.
//This looks for <app-root> in index.html and loads the app module in the browser.
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//Config for collecting ./app/app.module.ts
import { AppModule } from './app/app.module';

import Swal from 'sweetalert2';

//Initiate and starts the application by using platformBrowserDynamic and  loading bootstrapModule with AppModule
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
