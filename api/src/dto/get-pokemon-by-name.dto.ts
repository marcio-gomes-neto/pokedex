import { IsNotEmpty, IsString } from "class-validator";

export class GetPokemonByNameDTO {
    @IsNotEmpty({ message: 'É necessário informar o nome.' })
    @IsString({ message: 'Nome inválido.' })
    name!: string;
}