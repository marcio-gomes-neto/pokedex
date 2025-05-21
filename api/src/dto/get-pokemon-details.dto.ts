import { IsNotEmpty, IsString } from "class-validator";

export class GetPokemonDetailsDTO {
    @IsNotEmpty({ message: 'É necessário informar a página.' })
    @IsString({ message: 'Página inválida.' })
    id!: string;
}