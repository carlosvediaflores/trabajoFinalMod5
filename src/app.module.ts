import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [ProductosModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
