import { platformBrowser } from '@angular/platform-browser';
import { PokedexAppModule } from './app/app.module';

platformBrowser()
  .bootstrapModule(PokedexAppModule)
  .catch((err) => console.error(err));
