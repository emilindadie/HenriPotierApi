import { CardDto, ICard, OneCardDto } from '../../src/models';
import { CardTransactionDto } from '../../src/models/card/card-transaction.model';

export const cardDtoMock = new CardDto();
cardDtoMock.cardNumber = 678908776;
cardDtoMock.expiration = 1590962400000;
cardDtoMock.cryptogramme = 679;


export const cardTransactionDtoMock = new CardTransactionDto();
cardTransactionDtoMock.id = 1;
cardTransactionDtoMock.amount = 600;

export const icardMock: ICard = {
    id: 1,
    cardNumber: 768998789,
    expiration: new Date(),
    cryptogramme: 5500,
    solde: 7000
};


export const oneCardDtoMock = new OneCardDto();
oneCardDtoMock.cardNumber = 567898765;
oneCardDtoMock.cryptogramme = 567;
oneCardDtoMock.expiration = 1590962400000;

export const getAllCardMock: ICard[] = [{
    id: 1,
    cardNumber: 677879987,
    expiration: new Date(),
    cryptogramme: 5500,
    solde: 9000
}];
