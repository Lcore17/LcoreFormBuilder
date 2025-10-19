import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(helmet.default());
  app.use(cookieParser());

  // CORS
  const origin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
  app.enableCors({
    origin,
    credentials: true,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Lcore Forms API')
    .setDescription('API documentation for Lcore Forms backend')
    .setVersion('1.0')
    .addCookieAuth('access_token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}
bootstrap();
