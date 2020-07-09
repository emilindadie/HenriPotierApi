import { binding, given, then, when} from 'cucumber-tsflow';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { assert } from 'chai';
import { threadLocals } from './context';
import { CardDto, ICard } from '../../../src/models/card';

@binding()
export class StepDefsCardCreation {

    @given(/^a Card of number (.*) and of expiration (.*) and of cryptogramme (.*)$/)
    public aCardOfNumber09879486007358(number: string, expiration: string, cryptogramme: string) {
        const card: CardDto = new CardDto();
        card.number = Number(number);
        card.expiration = Number(expiration);
        card.cryptogramme = Number(cryptogramme);
        threadLocals.set(CardDto, card);
    }

    @when('user want to create a card')
    public async userWantToCreateACard()  {
        const service = axios.create({
            baseURL: 'http://localhost:3000',
        });
        const response: AxiosResponse<ICard> = await service.post<ICard>('henripotier/api/cards', threadLocals.get(CardDto));
        threadLocals.set(typeof response, response);
    }

    @then('the card is created')
    public theCardIsCreated() {
        let response: AxiosResponse<ICard> = null;
        response = threadLocals.get(typeof response);
        assert.equal(response.status, 201);
    }
}
