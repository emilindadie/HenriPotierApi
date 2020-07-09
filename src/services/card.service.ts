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

    async checkIfCardExist(cardNumber: number): Promise<boolean> {
        const users = await this.getcardByCardNumber(cardNumber);
        if (users) {
            return true;
        }
        return false;
    }

    async getcardByCardNumber(cardNumber: number): Promise<any> {
        return await this.cardRepository.findOne({ cardNumber });
    }

     async create(cardDto: CardDto): Promise<ICard> {
        const cardExist = await this.checkIfCardExist(cardDto.cardNumber);
        if (cardExist) {
            throw new Error('card already exist!');
        }
         const card = new CardEntity();
         card.cardNumber = cardDto.cardNumber;
         card.expiration = new Date(cardDto.expiration);
         card.cryptogramme = cardDto.cryptogramme;
         card.solde = cardDto.solde;
        return await this.cardRepository.save(card);
     }

     async getAll(): Promise<ICard[]> {
       return await this.cardRepository.find();
    }
}
