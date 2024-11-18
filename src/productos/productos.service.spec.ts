import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities';
import { Categoria } from 'src/categorias/entities/categoria.entity';

describe('PedidosService', () => {
  let service: ProductosService;
  let repoProduct: Repository<Producto>;
  let repoCategory: Repository<Categoria>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosService,
        {
          provide: getRepositoryToken(Producto),
          useClass: Repository,
        },
       ],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
