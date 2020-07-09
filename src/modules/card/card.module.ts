import { Module } from '@nestjs/common';
import { CardService } from 'src/services/card.service';
import { CardController } from 'src/controllers/card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/entities';
@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity]),
    ],
    controllers: [CardController],
    providers: [CardService],
  })
  export class CardModule {}