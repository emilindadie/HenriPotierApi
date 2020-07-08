import { binding, given, then, when} from 'cucumber-tsflow';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { assert } from 'chai';
import { threadLocals } from './context';
import { CardDto, ICard } from '../../../src/models/card';

@binding()
export class StepDefsCardCreation {

    @given(/^a Card of number (.*) and of expiration (.*) and of cryptogramme (.*)$/)
    public a_card_of_number_09879486007358(number: number, expiration: number, cryptogramme: number) {
        const card: CardDto = new CardDto();
        card.number = number;
        card.expiration = new Date(expiration);
        card.cryptogramme = cryptogramme;
        threadLocals.set(CardDto, card);
    }

    @when('user want to create a card')
    public async user_want_to_create_a_card()  {
        const service = axios.create({
            baseURL: 'http://localhost:3000',
        });
        const response: AxiosResponse<ICard> = await service.post<ICard>('henripotier/api/card', threadLocals.get(CardDto));
        threadLocals.set(typeof response, response);
    }

    @then('the card is created')
    public the_card_is_created() {
        let response: AxiosResponse<ICard>;
        response = threadLocals.get(typeof response);
        assert.equal(response.status, 201);
    }
}
