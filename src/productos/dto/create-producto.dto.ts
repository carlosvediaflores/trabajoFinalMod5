import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductoDto {

    @ApiProperty({
        description: 'Nombre del producto (unique)',
        example: 'Leche',
        nullable: false,
        minLength: 3
    })
    @IsString()
    @MinLength(3)
    nombre: string;

    
    @ApiProperty({description: 'Precio del producto', example: 19.90 })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio?: number;

    @ApiProperty({description: 'Descripción del producto', example: 'Lata grande' })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({description: 'Estado del Producto', example: 'ACTIVO' })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiProperty({description: 'Imagenes del Producto', example: ["http://image1.jpg",
        "http://image2.jpg"]})
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

    @ApiProperty({description: 'ID de la categoría del producto', example: '7f84105c-9385-4427-9abb-c1098ccbd420'})
    @IsString()
    idCategoria: string;

}
