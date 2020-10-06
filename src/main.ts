import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from 'path';
import { NotFoundExceptionFilter } from './frontend.catch';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const options = new DocumentBuilder()
    .setTitle('Dagaz Server')
    .setDescription('Dagaz Server API description')
    .setVersion('0.0.1')
    .addTag('dagaz')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);  

  app.useStaticAssets(join(__dirname, '/../public'), {prefix: '/'});
  app.setBaseViewsDir(join(__dirname, '/../public'));
  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
