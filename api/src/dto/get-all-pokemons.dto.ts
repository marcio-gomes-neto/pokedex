import { IsNotEmpty, IsString } from "class-validator";

export class GetAllPokemonsDTO {
    @IsNotEmpty({ message: 'É necessário informar a página.' })
    @IsString({ message: 'Página inválida.' })
    page!: string;

    @IsNotEmpty({ message: 'É necessário informar o tamanho da página.' })
    @IsString({ message: 'Tamanho da página inválido.' })
    pageSize!: string;
}