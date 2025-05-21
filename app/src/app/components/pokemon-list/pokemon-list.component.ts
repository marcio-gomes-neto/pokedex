import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonList } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.api.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  pokemons: PokemonList[] = [];
  isLoading = false;
  currentPage = 0;
  itemsPerPage = 30;
  hasMorePokemons = true;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchPokemon(searchTerm);
    });
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchTerm);
  }

  loadPokemons(reload: boolean = false): void {
    if (this.isLoading || !this.hasMorePokemons) return;

    this.isLoading = true;
    this.pokemonService.getAllPokemons(this.currentPage, this.itemsPerPage)
      .then((response) => {
        this.pokemons = reload ? response.data : [...this.pokemons, ...response.data];
        this.hasMorePokemons = response.data.length === this.itemsPerPage;
        this.currentPage++;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error loading pokemons:', error);
        this.isLoading = false;
      });
  }

  searchPokemon(name?: string): void {
    const searchName = name || this.searchTerm;

    if (!searchName.trim()) {
      this.isLoading = false;
      this.hasMorePokemons = true;
      this.currentPage = 0;
      this.itemsPerPage = 30;

      this.loadPokemons(true);
      return;
    }
    this.isLoading = true;

    this.pokemonService.searchPokemonByName(searchName)
      .then((response) => {
        this.pokemons = response.data;
        this.hasMorePokemons = response.data.length === this.itemsPerPage;
        this.currentPage++;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error loading pokemons:', error);
        this.isLoading = false;
      });
  }

  @Output() pokemonSelected = new EventEmitter<string>();
  onPokemonSelected(pokemon: PokemonList): void {
    this.pokemonSelected.emit(pokemon.id);
  }
}
