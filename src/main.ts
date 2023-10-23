import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // app.setGlobalPrefix('api', { exclude: ['/robots.txt'] });

  // Swagger
  const options: SwaggerDocumentOptions = {
    // operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESC)
    .setVersion(process.env.SWAGGER_VERSION)
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup(process.env.SWAGGER_PATH ?? 'swagger', app, document);

  await app.listen(port, () => console.log(`Server started on port = ${port}`));
}

bootstrap();
