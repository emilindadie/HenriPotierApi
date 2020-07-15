import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { SecureCardModule } from './modules/securecard/secure-card.module';
import { SeederModule } from './modules/seeder/seeder.module';

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
      migrationsRun: true,
      logging: true,
      // Allow both start:prod and start:dev to use migrations
      // __dirname is either dist or src folder, meaning either
      // the compiled js in prod or the ts in dev.
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      synchronize: true,
      cli: {
        // Location of migration should be inside src folder
        // to be compiled into dist/ folder.
        migrationsDir: 'src/migrations',
      },
    }),
    Logger,
    SecureCardModule,
    SeederModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}