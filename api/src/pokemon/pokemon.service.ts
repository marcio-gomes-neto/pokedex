import { Injectable } from "@nestjs/common";
import { api } from "src/config/api";
import { GetAllPokemonsDTO } from "src/dto/get-all-pokemons.dto";
import { GetPokemonByNameDTO } from "src/dto/get-pokemon-by-name.dto";

// Ao invés de criar um serviço que tem todos as funções da controller juntas, 
// normalmente opto por criar um serviço pra cada rota para uma melhor organização. 
// Mas nesse caso acredito que vai ser 2 ou 3 rotas somente, então não tem necessidade
// de escalar.
@Injectable()
export class PokemonService {
    private pokemonNames: { id: number, name: string }[] = [];
    private readonly spriteUrl: string;

    constructor(){
        this.spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    }

    async onModuleInit() {
        await this.loadAllPokemonNames();
    }

    private async loadAllPokemonNames() {
        try {
            const getAllPokemons = await api.get('pokemon', { params: { limit: 2000, offset: 0 }});
            this.pokemonNames = getAllPokemons.data.results.map((el) => {
                const url = el.url.split("/");
                const id = url[url.length - 2];
                return { name: el.name, id, imageUrl: `${this.spriteUrl}${id}.png`};
            });
            console.log('Initialized Pokemon data')
        } catch (error: unknown) {
            throw new Error('Failed to initialize Pokemon data');
        }
    }

    async getAllPokemons (query: GetAllPokemonsDTO) {
        const page = parseInt(query.page);
        const pageSize = parseInt(query.pageSize);

        const getAllPokemons = await api.get('pokemon', { params: {
            limit: pageSize,
            offset: (page * pageSize),
        }});

        return {
            count: getAllPokemons.data.count,
            data: getAllPokemons.data.results.map((el) => {
                const url = el.url.split("/");
                const id = url[url.length - 2];
                return { name: el.name, id, imageUrl: `${this.spriteUrl}${id}.png`};
            })
        }
    }
    //essa rota eu improvisei um search nela. Teoricamente na API do pokemon já existe um search
    //mas eu queria que fosse possivel pesquisar parcialmente pelo nome do pokemon e encontrar
    async getPokemonByName (query: GetPokemonByNameDTO) {
        const name = query.name;
        const responseData: { id: number; name: string; }[] = [];

        this.pokemonNames.map((el) => {
          if(el.name.includes(name)) responseData.push(el);
        });

        return {
            count: responseData.length,
            data: responseData,
        }
    }

    async getPokemonDetails (id: string) {
        if(isNaN(parseInt(id))) throw 'Malformed Id';
        const getPokemonDetails = await api.get(`pokemon/${id}`);
        return {...getPokemonDetails?.data, imageUrl: `${this.spriteUrl}${id}.png`};
    }
}
