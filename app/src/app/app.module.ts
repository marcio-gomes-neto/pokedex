import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { PokedexAppComponent } from "./pages/pokedex/pokedex-app";
import { PokemonService } from "./services/pokemon.api.service";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";
import { PokemonDetailsComponent } from "./components/pokemon-details/pokemon-details.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    PokemonService,
  ],
  declarations: [
    PokedexAppComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
  ],
  bootstrap: [PokedexAppComponent],
})
export class PokedexAppModule {}
