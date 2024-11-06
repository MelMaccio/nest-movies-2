import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Movies API')
    .setDescription(
      'To use correctly test this API follow this steps: signup, login, and paste the auth token in the "Authorize" lock bellow. Important: for agile testing purposes the expiration of jwt has been set to 1 minute'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha'
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
