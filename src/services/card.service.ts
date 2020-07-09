import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from 'src/entities';
import { ICard, CardDto } from 'src/models';

@Injectable()
export class CardService {
    constructor(
            @InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>) {
            }

     async create(cardDto: CardDto): Promise<ICard> {
         const card = new CardEntity();
         card.number = cardDto.number;
         card.expiration = cardDto.expiration;
         card.cryptogramme = cardDto.cryptogramme;
        return await this.cardRepository.save(card);
     }
}
