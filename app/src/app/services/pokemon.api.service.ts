import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { PokemonDetails, PokemonListResponse} from '../models/pokemon.model'
import { api } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  async getAllPokemons(page: number = 1, pageSize: number = 20): Promise<PokemonListResponse> {
    try {
      const response: AxiosResponse<PokemonListResponse> = await api.get('', {
        params: { page: page.toString(), pageSize: pageSize.toString() }
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      throw error;
    }
  }

  async searchPokemonByName(name: string): Promise<PokemonListResponse> {
    try {
      const response: AxiosResponse<PokemonListResponse> = await api.get('/search', {
        params: { name }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching pokemon:', error);
      throw error;
    }
  }

  async getPokemonDetails(id: string): Promise<PokemonDetails> {
    try {
      const response: AxiosResponse<PokemonDetails> = await api.get(`/details/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
      throw error;
    }
  }
}