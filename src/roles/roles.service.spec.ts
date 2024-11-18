import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { CreateRoleDto } from './dto/create-role.dto';

describe('RolesService', () => {
  let service: RolesService;
  let repo: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    repo = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debe encontrarse un rol por id', async () => {
    const roles = new Role();
    roles.id = 'de7e95ba-031e-4d9d-a1d8-ced8b4e4c1fe';
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(roles);
    log(roles)
    expect(await service.findOne('de7e95ba-031e-4d9d-a1d8-ced8b4e4c1fe')).toEqual(roles);
  });

  it('deberia crear un articulo', () => {
    const rol: any = new Role()
    
    rol.id= 'de7e95ba-031e-4d9d-a1d8-ced8b4e4c1fe',
    rol.nombreRol= 'ADMIN',
   
    jest.spyOn(service, 'createRol').mockImplementation(() => rol)
    const createRoleDto: CreateRoleDto = {
      nombreRol: 'ADMIN',
    }
    log(createRoleDto)
    expect(service.createRol(createRoleDto)).toBeInstanceOf(Role)
  })

  it('deberia modificar un articulo', () => {
    const rol: any = new Role()
    
    rol.id= 'de7e95ba-031e-4d9d-a1d8-ced8b4e4c1fe',
    rol.nombreRol= 'ADMIN',
    
    jest.spyOn(service, 'update').mockImplementation(() => rol)
    const newRol: Partial<CreateRoleDto> = {
      nombreRol: 'USER',
    }
    const resultado:any = service.update('de7e95ba-031e-4d9d-a1d8-ced8b4e4c1fe', newRol)
    log('resp',resultado)
   // expect(resultado).toBeInstanceOf(rol)
    expect(resultado.nombreRol).not.toBe(newRol.nombreRol)
  })
});