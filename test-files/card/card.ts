import { CardDto, ICard } from '../../src/models';

export const cardDto = new CardDto();
cardDto.number = 2222;
cardDto.expiration = new Date();
cardDto.cryptogramme = 679

export const icard: ICard = {
    id: 1,
    number: 67777,
    expiration: new Date(),
    cryptogramme: 5500,
};
