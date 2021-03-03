import { NestFactory } from '@nestjs/core';
import { Request } from 'express';

import { AppModule } from './app/app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require('express-http-proxy')(
  'http://localhost:4200',
  { filter: (req: Request) => req.url.indexOf('/api') !== 0 },
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(proxy); // Proxy to Angular dev server

  // Exercise for the reader:
  // Serve the static Angular files in production here.

  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
