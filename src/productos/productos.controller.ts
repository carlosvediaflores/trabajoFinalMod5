import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Auth, GetUser } from 'src/usuarios/decorators';
import { ValidRoles } from 'src/usuarios/interfaces';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Producto } from './entities';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('productos')
@ApiBearerAuth()
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @Auth( ValidRoles.admin )
 
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: Producto  })
  @ApiResponse({ status: 400, description: 'Bad request. Producto ya existe registrado con este nombre' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Usuario no se encontró (request)' })
  @ApiResponse({ status: 401, description: 'Error: No estas autorizado para acceder a este endpoind.' })
  
  create(@Body() createProductoDto: CreateProductoDto,
  @GetUser() user: Usuario) {
    return this.productosService.create(createProductoDto, user);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.user )
  @ApiResponse({ status: 200, description: 'Lista de todos los Productos', type: Producto  })
  findAll(@Query() paginationDtoDto:PaginationDto) {
    return this.productosService.findAll(paginationDtoDto);
  }

  @Get(':term')
  @Auth( ValidRoles.admin, ValidRoles.user)
  @ApiResponse({ status: 200, description: 'Buscar por ID o Nombre del producto', type: Producto  })
  findOne(@Param('term') term: string) {
    return this.productosService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth( ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'Producto actualizado', type: Producto  })
  @ApiResponse({ status: 400, description: 'Bad request. Producto ya existe registrado con este nombre' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Usuario no se encontró (request)' })
  @ApiResponse({ status: 401, description: 'Error: No estas autorizado para acceder a este endpoind.' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductoDto: UpdateProductoDto,  @GetUser() user: Usuario) {
    return this.productosService.update(id, updateProductoDto, user);
  }

  @Delete(':id')
  @Auth( ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'Producto Eliminado', type: Producto  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }
}
