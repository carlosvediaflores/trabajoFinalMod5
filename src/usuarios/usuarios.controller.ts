import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUserDto, CreateUsuarioDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { Usuario } from './entities/usuario.entity';
import { log } from 'console';
import { IncomingHttpHeaders } from 'http';
import { ValidRoles } from './interfaces';
import { UserRoleGuard } from './guards/user-role.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}


  @Post('register')
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: Usuario  })
  @ApiResponse({ status: 400, description: 'Bad request. Email ya existe registrado con este nombre' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error. Usuario no se encontró (request)' })
  @ApiResponse({ status: 401, description: 'Error: No estas autorizado para acceder a este endpoind.' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.usuariosService.login( loginUserDto );
  }

  @UseGuards( AuthGuard() )
  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todos los usuarios', type: Usuario  })
  findAll( @GetUser() user: Usuario,) {
    log(user)
    return this.usuariosService.findAll();
  }

  @Get('check-status')
  @Auth()
  @ApiResponse({ status: 200, description: 'verificar token', type: Usuario  })
  checkAuthStatus(
    @GetUser() user:Usuario
  ) {
    return this.usuariosService.checkAuthStatus( user );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
