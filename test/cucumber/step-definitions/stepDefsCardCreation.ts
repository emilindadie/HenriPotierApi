import { binding, given, then, when} from 'cucumber-tsflow';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { assert } from 'chai';
import { threadLocals } from './context';
import { CardDto, ICard } from '../../../src/models/card';
import { MyApiResponse } from 'src/models/api-response/api-response.model';

@binding()
export class StepDefsCardCreation {

    @given(/^a Card of cardNumber (.*) and of expiration (.*) and of cryptogramme (.*) and of solde (.*)$/)
    public aCardOfNumber09879486007358(cardNumber: string, expiration: string, cryptogramme: string, solde: string) {
        const card: CardDto = new CardDto();
        card.cardNumber = Number(cardNumber);
        card.expiration = Number(expiration);
        card.cryptogramme = Number(cryptogramme);
        card.solde = Number(solde);
        threadLocals.set(CardDto, card);
    }

    @when('user want to create a card')
    public async userWantToCreateACard()  {
        const service = axios.create({
            baseURL: 'http://localhost:3000',
        });
        const response: AxiosResponse<MyApiResponse<ICard>> = await service.post<MyApiResponse<ICard>>('henripotier/api/cards', threadLocals.get(CardDto));
        threadLocals.set(typeof response, response);
    }

    @then('the card is created')
    public theCardIsCreated() {
        let response: AxiosResponse<ICard> = null;
        response = threadLocals.get(typeof response);
        assert.equal(response.status, 201);
    }
}
