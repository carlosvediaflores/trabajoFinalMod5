import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';

class ProductoPedidoDto {
  @IsString()
  idProducto: string;

  @IsInt({ message: 'cantidad debe ser numérico' })
  cantidad: number;
}

export class CreatePedidoDto {
  @IsArray({ message: 'Revise los datos en productos' })
  @ValidateNested({ each: true })
  @Type(() => ProductoPedidoDto)
  productos: ProductoPedidoDto[];
}
