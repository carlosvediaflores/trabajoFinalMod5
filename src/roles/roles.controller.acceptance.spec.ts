
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { log } from 'console';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

describe('Role Acceptance Tests', () => {
  let app: INestApplication;
  let rolService: RolesService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Debería registrar un nuevo Rol', () => {
    return request(app.getHttpServer())
      .post('/roles')
      .send({ nombreRol: 'USER' })
      .expect(201);
  });

  it('El usuario debería poder crear un rol y recuperarlo', async () => {
    const role = { nombreRol: 'SUPER_USER' };

    // Create a role
    const createResponse = await request(app.getHttpServer())
      .post('/roles')
      .send(role);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.nombreRol).toBe(role.nombreRol);

    // Get all roles and validate the created one is in the list
    const getResponse = await request(app.getHttpServer()).get('/roles');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual(
      expect.arrayContaining([expect.objectContaining(role)]),
    );
  });

  it('Validar creación de un artículo en estado BORRADOR', async () => {
    const createRoleDto: CreateRoleDto = {
      description: 'Articulo aceptación',
    }

    const respuestaCrear = await request(app.getHttpServer())
    .post('/roles')
    .send(createRoleDto)

    expect(respuestaCrear.status).toBe(201)
    expect(respuestaCrear.body).toBeDefined()

    const respuestaListar = await request(app.getHttpServer())
    .get(`/roles/${respuestaCrear.body.id}`)
    .send()
    expect(respuestaListar.status).toBe(200)
    expect(respuestaListar.body.nombreRol).toBe('USER')
    
  })

   it('Deberia modificar un articulo [Acceptance]', async () => {

    const createRoleDto: CreateRoleDto = {
      description: 'Rol aceptación',

    }
    const articuloCreado = await request(app.getHttpServer())
    .post('/roles')
    .send(createRoleDto);
   
    const idRolAModificar = articuloCreado.body.id;
    const datosModificacion:any = {
      description: 'Rol de aceptación modificado',
    };

    const respuestaModificar = await request(app.getHttpServer())
      .patch(`/roles/${idRolAModificar}`)
      .send(datosModificacion);
    expect(respuestaModificar.status).toBe(200);
    expect(respuestaModificar.body.id).toEqual(idRolAModificar);

    const articuloActualizado = await request(app.getHttpServer())
    .get(`/roles/${idRolAModificar}`)
    expect(articuloActualizado).toBeDefined();
    expect(articuloActualizado.body.description).toEqual(datosModificacion.description);
  })
  
  afterAll(async () => {
    await app.close();
  });
});
