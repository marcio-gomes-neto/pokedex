import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonDetails, PokemonList } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.api.service';

@Component({
  selector: 'pokedex',
  templateUrl: './pokedex-app.html',
  styleUrl: './pokedex-app.scss'
})
export class PokedexAppComponent {
  selectedPokemon: PokemonDetails | null = null;

  constructor(private pokemonService: PokemonService) {}

  onPokemonSelected(pokemon: string): void {
    this.pokemonService.getPokemonDetails(pokemon)
      .then((response) => {
        this.selectedPokemon = response
      })
      .catch((error) => {
        console.error('Error loading pokemons:', error);
      });
  }

}
