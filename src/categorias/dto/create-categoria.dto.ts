import { IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsString({ message: 'El nombre de la categoría debe ser texto'})
    nombreCategoria: string;

    @IsString()
    @IsOptional()
    estado?: string;
}
