import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from '../entities';
import { ICard, CardDto } from '../models';

@Injectable()
export class CardService {
    constructor(
            @InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>) {
            }

     async create(cardDto: CardDto): Promise<ICard> {
         const card = new CardEntity();
         card.number = cardDto.number;
         card.expiration = new Date(cardDto.expiration);
         card.cryptogramme = cardDto.cryptogramme;
        return await this.cardRepository.save(card);
     }

     async getAll(): Promise<ICard[]> {
       return await this.cardRepository.find();
    }
}
