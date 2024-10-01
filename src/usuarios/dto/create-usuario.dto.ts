import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {
    
    @ApiProperty({
        description: 'Correo del usuario (unique)',
        example: 'carlosvf782@gmail.com',
        nullable: false,
        minLength: 8
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'Car10s.*',
        nullable: false,
        minLength: 8
    })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener una letra mayúscula, minúscula y un número'
    })
    password: string;

    @ApiProperty({
        description: 'Nombres y Apellidos del ususario',
        example: 'Carlos Rudy Vedia Flores',
        nullable: false,
        minLength: 3
    })
    @IsString()
    @MinLength(3)
    nombres: string;

    @ApiProperty({description: 'Roles del usuario', example: ["USER",
        "ADMIN"]})
    @IsArray()
    @IsString({ each: true })
    roles: string[]

}
