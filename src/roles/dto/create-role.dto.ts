import { IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    // @IsString({ message: 'El nombre del rol debe ser texto'})
    // nombreRol: string;

    @IsString({ message: 'El descripcion del rol debe ser texto'})
    @IsOptional()
    description: string;

}
