import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/usuario.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles: string[] = this.reflector.get( META_ROLES , context.getHandler() )

    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;
    
    const req = context.switchToHttp().getRequest();
    const user = req.user as Usuario;

    if ( !user ) 
      throw new BadRequestException('No se encontró al usuario');
    
    for (const role of user.roles ) {
      if ( validRoles.includes( role.nombreRol ) ) {
        return true;
      }
    }
    
    throw new ForbiddenException(
      `No tienes roles suficientes`
    );
  }
}
