import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FilterDto } from './dto/filter-producto.dto';
import { Auth, GetUser } from 'src/usuarios/decorators';
import { ValidRoles } from 'src/usuarios/interfaces';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @Auth( ValidRoles.admin )
  create(@Body() createProductoDto: CreateProductoDto,
  @GetUser() user: Usuario) {
    return this.productosService.create(createProductoDto, user);
  }

  @Get()
  @Auth(ValidRoles.admin )
  findAll(@Query() filterDto:FilterDto) {
    return this.productosService.findAll(filterDto);
  }

  @Get(':term')
  @Auth( ValidRoles.admin)
  findOne(@Param('term') term: string) {
    return this.productosService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth( ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductoDto: UpdateProductoDto,  @GetUser() user: Usuario) {
    return this.productosService.update(id, updateProductoDto, user);
  }

  @Delete(':id')
  @Auth( ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }
}
