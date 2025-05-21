import { Component, Input } from '@angular/core';
import { PokemonDetails } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {
  @Input() pokemon!: PokemonDetails;

  getPokemonImage(): string {
    console.log(this.pokemon)
    return this.pokemon.imageUrl;
  }

  getTypeClass(typeName: string): string {
    return `type-${typeName.toLowerCase()}`;
  }

  convertDecimetersToFeetInches(dm: number): string {
    const cm = dm * 10;
    return `${cm} cm`;
  }

  convertHectogramsToPounds(hg: number): string {
    const kg = hg / 10;
    return `${kg.toFixed(1)} kg`;
  }
}