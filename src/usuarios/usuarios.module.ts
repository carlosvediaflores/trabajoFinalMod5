import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, JwtStrategy],
  imports:[
    
    ConfigModule,

    TypeOrmModule.forFeature([ Usuario, Role]),

  PassportModule.register({ defaultStrategy: 'jwt' }),

  JwtModule.registerAsync({
    imports: [ ConfigModule ],
    inject: [ ConfigService ],
    useFactory: ( configService: ConfigService ) => {
      return {
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn:'2h'
        }
      }
    }
  })
  //  JwtModule.register({
  //     secret: process.env.JWT_SECRET,
  //     signOptions: {
  //       expiresIn:'2h'
  //     }
  //   })

],
exports: [ TypeOrmModule, JwtStrategy, PassportModule, JwtModule ]
})
export class UsuariosModule {}
