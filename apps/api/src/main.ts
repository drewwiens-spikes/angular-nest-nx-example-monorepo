import { NestFactory } from '@nestjs/core';
import { Request } from 'express';
import * as expressHttpProxy from 'express-http-proxy';

import { AppModule } from './app/app.module';

const proxy = expressHttpProxy(
  'http://localhost:4200',
  { filter: (req: Request) => req.url.indexOf('/api') !== 0 },
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(proxy); // Proxy to Angular dev server

  // Serve the static Angular files in production here.

  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
