import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductoDto {
    @IsString()
    @MinLength(3)
    nombre: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio?: number;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    estado?: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    image: string[];

    @IsString()
    idCategoria: string;

}
