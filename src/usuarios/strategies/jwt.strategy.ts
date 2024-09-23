import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { log } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( Usuario )
        private readonly userRepository: Repository<Usuario>,

        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate( payload: JwtPayload ): Promise<Usuario> {
        
        const { id } = payload;

        const user = await this.userRepository.findOneBy({ id });

        log('user',user)
        if ( !user ) 
            throw new UnauthorizedException('Token no es válido')
            
        if ( !user.isActive ) 
            throw new UnauthorizedException('Usuario Inactivo, consulte con el administrador');
        
        return user;
    }

}