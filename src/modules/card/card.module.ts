import { Module } from '@nestjs/common';
import { CardService } from '../../services/card.service';
import { CardController } from '../../controllers/card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from '../../entities';
@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity]),
    ],
    controllers: [CardController],
    providers: [CardService],
  })
  export class CardModule {}