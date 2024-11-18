/* import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CreateRoleDto } from './dto/create-role.dto';

describe('CalculatorController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

//   it('/articulos (POST) crear articulo', async () => {
//     const articuloACrear: CreateRoleDto = {
//       nombreRol: 'Articulo integrador',
     
//     }

//     const resultado = await request(app.getHttpServer())
//     .post('/articulos')
//     .send(articuloACrear)
    
//     const articuloRespuesta = resultado.body
//     expect(articuloRespuesta).toBeDefined()
//   });

//   it('Validar creación de un artículo en estado BORRADOR', async () => {
//     const articuloCrear: CreateRoleDto = {
//       nombreRol: 'Articulo aceptación',
     
//     }

//     const respuestaCrear = await request(app.getHttpServer())
//       .post('/articulos')
//       .send(articuloCrear)

//     expect(respuestaCrear.status).toBe(201)
//     // expect(respuestaCrear).toBeInstanceOf(Articulo)

//     const respuestaListar = await request(app.getHttpServer())
//       .get(`/articulos/${respuestaCrear.body.dato.id}`)
//       .send()

//     expect(respuestaListar.status).toBe(200)
//     expect(respuestaListar.body.dato.estado).toBe('BORRADOR')

//   })


}); */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

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
});
