import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { log } from 'console';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  const dataRol:any =  new Role()
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
      controllers: [RolesController],
     
    }).compile();

    service = module.get<RolesService>(RolesService);
    controller = module.get<RolesController>(RolesController);

    dataRol._id = 'de7e95ba-031e-4d9d-a1d8-ced8b4e4c1fe';
    dataRol.nombreRol =  'USER'
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it('Debería crear Rol', () => {
    const createRoleDto: CreateRoleDto = {
      description: 'usuario basico',
    }
    jest.spyOn(service, 'createRol').mockImplementation(() => dataRol)
    log(dataRol)
    expect(controller.create(createRoleDto)).toBeInstanceOf(Role)
  })

});
