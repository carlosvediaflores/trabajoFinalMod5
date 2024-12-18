import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { log } from 'console';

describe('User Module (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([Role])
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET roles', () => {
    return request(app.getHttpServer())
      .get('/roles')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/roles (POST) crear rol', async () => {
    const createRoleDto: CreateRoleDto = {
      //nombreRol: 'ADMIN',
      description: 'usuario basico',
    }
    const resultado = await request(app.getHttpServer())
    .post('/roles')
    .send(createRoleDto)
    log(resultado.body)
    const rolRespuesta = resultado.body
    expect(rolRespuesta).toBeDefined()
  });

  it('Validar creación de un rol en estado USER', async () => {
    const createRoleDto: CreateRoleDto = {
      description: 'usuario basico',
    }

    const respuestaCrear = await request(app.getHttpServer())
      .post('/roles')
      .send(createRoleDto)

      log(respuestaCrear.body)
    expect(respuestaCrear.status).toBe(201)
    //expect(respuestaCrear).toBeInstanceOf(Role)
    const respuestaListar = await request(app.getHttpServer())
      .get(`/roles/${respuestaCrear.body.id}`)
      .send()
   // log(respuestaListar)
    expect(respuestaListar.status).toBe(200)
    expect(respuestaListar.body.nombreRol).toBe('USER')

  })
});
