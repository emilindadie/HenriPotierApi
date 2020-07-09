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
        const users = await this.getCardByCardNumber(cardNumber);
        if (users) {
            return true;
        }
        return false;
    }

    async getCardByCardNumber(cardNumber: number): Promise<any> {
        return await this.cardRepository.findOne({ cardNumber });
    }

    async getCardById(id: number): Promise<CardEntity> {
        return await this.cardRepository.findOne({id});
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

    async getOne(cardNumber: number, expiration: Date, cryptogramme: number): Promise<ICard> {
        const card = await this.cardRepository.findOne({cardNumber, cryptogramme, expiration});
        if (!card) {
            throw new Error('Maybe any information are eroned!');
        }
        return card;
    }

    async doTransaction(id: number, amount : number): Promise<ICard>{
        const card = await this.getCardById(id);
        card.solde += amount;
        if(card.solde < 0){
            throw new Error('Insuficient balance!');  
        }
        return this.cardRepository.save(card);
    }
}
