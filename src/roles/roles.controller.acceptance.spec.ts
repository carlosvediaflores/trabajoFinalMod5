/* import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest';
import { AppModule } from '../app.module'
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

describe('Articulos Acceptance', () => {
  let app: INestApplication
  let controller: RolesController;
  let service: RolesService;

  beforeAll(async () => {
    const moduleFixture: TestingModule =  await Test.createTestingModule({
      imports: [AppModule],
      providers: [RolesController, RolesService],
    }).compile()

    app = moduleFixture.createNestApplication()
    controller = moduleFixture.get<RolesController>(RolesController)
    service = moduleFixture.get<RolesService>(RolesService)
    
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  // it('Debería crear un artículo y retornar en la respuesta [Acceptance]', async() => {
  //   const fechaActual = new Date()

  //   const articuloCrear: CrearArticuloDto = {
  //     titulo: 'Articulo aceptación',
  //     contenido: 'Lorem Ipsum dolor at simet...',
  //     categoria: 'Office'
  //   }

  //   const respuestaCrear =  await request(app.getHttpServer())
  //   .post('/articulos')
  //   .send(articuloCrear)

  //   expect(respuestaCrear.status).toBe(201)
  //   // expect(respuestaCrear.body).toEqual({ ...articuloCrear, id: '1', _fecha_creacion: fechaActual.toISOString() })
  //   expect(respuestaCrear.body.titulo).toEqual(articuloCrear.titulo);

  // })

  // it('Deberia modificar un articulo [Acceptance]', async () => {

  //   const articuloCrear: CrearArticuloDto = {
  //     titulo: 'Articulo aceptación',
  //     contenido: 'Lorem Ipsum dolor at simet...',
  //     categoria: 'Office'
  //   }

  //   const articuloCreado = await articulosService.crear(articuloCrear)

  //   const idArticuloAModificar = articuloCreado.id;
  //   const datosModificacion: Partial<CrearArticuloDto> = {
  //     titulo: 'Articulo de aceptación modificado',
  //     contenido: 'Este articulo ha sido modificado.',
  //     categoria: 'Desarrollo',
  //   };

  //   const respuestaModificar = await request(app.getHttpServer())
  //     .put(`/articulos/${idArticuloAModificar}`)
  //     .send(datosModificacion);

  //   expect(respuestaModificar.status).toBe(200);
  //   expect(respuestaModificar.body.id).toEqual(idArticuloAModificar);

  //   const articuloActualizado = await articulosService.buscarPorId(idArticuloAModificar);
  //   expect(articuloActualizado).toBeDefined();
  //   expect(articuloActualizado.titulo).toEqual(datosModificacion.titulo);
  //   expect(articuloActualizado.contenido).toEqual(datosModificacion.contenido);
  //   expect(articuloActualizado.categoria).toEqual(datosModificacion.categoria);
  // })

  it('Validar creación de un artículo en estado BORRADOR', async () => {
    const createRoleDto: CreateRoleDto = {
      nombreRol: 'USER',
    }

    const respuestaCrear = await request(app.getHttpServer())
    .post('/articulos')
    .send(createRoleDto)

    expect(respuestaCrear.status).toBe(201)
    expect(respuestaCrear.body.dato).toBeDefined()

    const respuestaListar = await request(app.getHttpServer())
    .get(`/articulos/${respuestaCrear.body.dato.id}`)
    .send()

    expect(respuestaListar.status).toBe(200)
    expect(respuestaListar.body.dato.estado).toBe('BORRADOR')
    
  })
}) */

  import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { log } from 'console';

describe('User Acceptance Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should register a new user', () => {
    log('test', request)
    return request(app.getHttpServer())
      .post('/roles')
      .send({ nombreRol: 'USER' })
      .expect(201)
      ;
  });

  afterAll(async () => {
    await app.close();
  });
});