import { CardDto, ICard } from '../../src/models';

export const cardDtoMock = new CardDto();
cardDtoMock.number = 678908776;
cardDtoMock.expiration = 1590962400000;
cardDtoMock.cryptogramme = 679

export const icardMock: ICard = {
    id: 1,
    number: 768998789,
    expiration: new Date(),
    cryptogramme: 5500,
};


export const getAllCardMock: ICard[] = [{
    id: 1,
    number: 677879987,
    expiration: new Date(),
    cryptogramme: 5500,
}];
