import { NestFactory } from '@nestjs/core';
import { PokedexApiModule } from './pokedex-api.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
