import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Auth, GetUser } from 'src/usuarios/decorators';
import { ValidRoles } from 'src/usuarios/interfaces';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @Auth( ValidRoles.admin )
  create(@Body() createPedidoDto: CreatePedidoDto, @GetUser() user: Usuario) {
    return this.pedidosService.create(createPedidoDto, user);
  }

  @Get()
  @Auth( ValidRoles.admin )
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(id);
  }

  @Patch(':id')
  @Auth( ValidRoles.admin )
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto,  @GetUser() user: Usuario) {
    return this.pedidosService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(id);
  }
}
