import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { SecureCardModule } from './modules/securecard/secure-card.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.HOST}`,
      port: Number(process.env.DB_PORT),
      username: `${process.env.USERNAME}`,
      password: `${process.env.PASSWORD}`,
      database: `${process.env.DATABASE}`,
      entities: [CardEntity],
      synchronize: true,
    }),
    SecureCardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
