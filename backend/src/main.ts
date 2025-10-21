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
  // Supports:
  // - FRONTEND_ORIGINS: comma-separated list of exact origins or regex patterns prefixed with 'regex:'
  // - FRONTEND_ORIGIN: single origin (backwards compatible)
  // Example FRONTEND_ORIGINS:
  //   "https://lcore-form-builder-frontend.vercel.app,regex:^https://lcore-form-builder-frontend-[a-z0-9-]+\\.lcore17s-projects\\.vercel\\.app$"
  const originsEnv = process.env.FRONTEND_ORIGINS || process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
  const parseOrigins = (val: string): (string | RegExp)[] => {
    return val
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        if (s.startsWith('regex:')) {
          const pattern = s.slice('regex:'.length);
          try {
            return new RegExp(pattern);
          } catch {
            // Fallback: ignore invalid regex and keep as literal string
            return pattern;
          }
        }
        return s;
      });
  };
  const allowedOrigins = parseOrigins(originsEnv);

  app.enableCors({
    credentials: true,
    origin: (requestOrigin, callback) => {
      // Allow non-browser or same-origin requests with no Origin header
      if (!requestOrigin) return callback(null, true);

      const isAllowed = allowedOrigins.some((allowed) =>
        allowed instanceof RegExp ? allowed.test(requestOrigin) : allowed === requestOrigin,
      );

      return isAllowed
        ? callback(null, true)
        : callback(new Error(`Not allowed by CORS: ${requestOrigin}`), false);
    },
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
