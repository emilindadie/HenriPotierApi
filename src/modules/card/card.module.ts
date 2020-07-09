import { Module } from '@nestjs/common';
import { CardService } from '../../services/card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from '../../entities';
@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity]),
    ],
    controllers: [],
    providers: [CardService],
    exports: [CardService]
  })
  export class CardModule {}