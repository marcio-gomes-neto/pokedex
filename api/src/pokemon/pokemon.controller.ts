import { Controller, Get, Param, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { GetAllPokemonsDTO } from "src/dto/get-all-pokemons.dto";
import { PokemonService } from "./pokemon.service";
import { GetPokemonByNameDTO } from "src/dto/get-pokemon-by-name.dto";
import { GetPokemonDetailsDTO } from "src/dto/get-pokemon-details.dto";

@Controller('pokemon')
export class PokemonController {
    constructor(
        private readonly pokemonService: PokemonService,
    ) {}

    @Get()
    async getAllPokemons(@Query() query: GetAllPokemonsDTO, @Res() res: Response) {
        try {
            const getPokemons = await this.pokemonService.getAllPokemons(query);
            console.log(getPokemons)
            return res.send(getPokemons).status(200);
        } catch (error) {
            console.log(error);
            return res.send('Não foi possível carregar os pokemons.').status(500);
        }
    }
    
    @Get('search')
    async getPokemonByName(@Query() query: GetPokemonByNameDTO, @Res() res: Response) {
        try {
            const getPokemons = await this.pokemonService.getPokemonByName(query);
            return res.send(getPokemons).status(200);
        } catch (error) {
            console.log(error);
            return res.send('Não foi possível carregar os pokemons.').status(500);
        }
    }

    @Get('details/:id')
    async getPokemonDetails(@Param() param: GetPokemonDetailsDTO, @Res() res: Response) {
        try {
            const getPokemon = await this.pokemonService.getPokemonDetails(param.id);
            return res.send(getPokemon).status(200);
        } catch (error) {
            console.log(error);
            return res.send('Não foi possível encontrar este pokemon.').status(500);
        }
    }
}
