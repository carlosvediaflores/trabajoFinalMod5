import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginUserDto, CreateUsuarioDto} from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/entities/role.entity';
import { log } from 'console';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly jwtService: JwtService,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {

    const roles = await this.roleRepository.find({
      where: createUsuarioDto.roles.map((roleNombre) => ({ nombreRol: roleNombre }))
    });

    if (roles.length !== createUsuarioDto.roles.length) {
      throw new NotFoundException('No se encontraron los roles requeridos');
    }

    try {
      const { password, ...usuarioData } = createUsuarioDto;

      const usuario = this.usuarioRepository.create({
        ...usuarioData,
        password: bcrypt.hashSync( password, 10 ),roles
      });
      await this.usuarioRepository.save( usuario );

      return {
        ...usuario,
        token: this.getJwtToken({ id: usuario.id })
      };
      
    } catch (error) { this.handleDBErrors(error);
    }
  }

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.usuarioRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true } //! OJO!
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentiales no validas (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentiales no validas (password)');
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  findAll() {
    return this.usuarioRepository.find({
      relations: {
        roles: true,
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async checkAuthStatus( user: Usuario ){

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };

  }

  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }
  
  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Favor revisar los logs');

  }
}
