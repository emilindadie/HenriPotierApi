import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecureCardModule } from './modules/securecard/secure-card.module';
import { SeederService } from './services/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const logger = app.get(Logger);
    const seeder = app.get(SeederService);

    seeder
      .seed()
      .then(() => {
        logger.debug('Seeding complete!');
      })
      .catch(error => {
        logger.error('Seeding failed!');
        throw error;
      })
  
  const port = process.env.SERVER_PORT || 3000;

  const options = new DocumentBuilder()
  .setTitle('HenriPotier API')
  .setDescription('The henriPotier API description')
  .setVersion('1.0')
  //.addTag('henripotier')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [SecureCardModule],
  })

  SwaggerModule.setup('henripotier/api/swagger-ui', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
