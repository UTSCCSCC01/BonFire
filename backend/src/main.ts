import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import * as fs from 'fs';

/** Setup the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Setup the swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Bonfire Backend API')
    .setDescription('Project for CSCC01')
    .setVersion('1.0.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, document);
    fs.writeFileSync("./swagger-spec.json", JSON.stringify(document, null, 2));
  }

  // Start the application
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
