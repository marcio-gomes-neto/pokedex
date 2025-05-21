export interface PokemonList {
  id: string;
  name: string;
  imageUrl: string;
}

export interface PokemonDetails { 
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default:boolean;
    order: number;
    weight: number;
    imageUrl: string;
    types: { slot: number; type:{ name: string } }[]
}
export interface PokemonListResponse {
  data: PokemonList[];
  count: number;
}