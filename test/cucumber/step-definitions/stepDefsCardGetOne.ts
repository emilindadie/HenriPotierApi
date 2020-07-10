import { binding, then, when} from 'cucumber-tsflow';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { assert } from 'chai';
import { threadLocals } from './context';
import { ICard, ISecureCard } from '../../../src/models/card';
import { OneCardDto } from '../../../src/models/card/card-get-one.model';
import { MyApiResponse } from '../../../src/models/api-response/api-response.model';

@binding()
export class StepDefsCardGetOne {

    @when(/^user want to get one card of cardNumber (.*) and of expiration (.*) and of cryptogramme (.*)$/)
    public async userWantToGetOneCard(cardNumber: string, expiration: string, cryptogramme: string)  {
        const service = axios.create({
            baseURL: 'http://localhost:3000',
        });

        const dto = new OneCardDto();
        dto.cardNumber = Number(cardNumber);
        dto.cryptogramme = Number(cryptogramme);
        dto.expiration = Number(expiration);

        const response: AxiosResponse<MyApiResponse<ICard[]>> = await service.post<MyApiResponse<ICard[]>>('henripotier/api/cards/secure', dto);
        threadLocals.set(typeof response, response);
    }

    @then('user get his card')
    public allCardIsGet() {
        let response: AxiosResponse<MyApiResponse<ISecureCard>> = null;
        response = threadLocals.get(typeof response);
        assert.equal(response.status, 200);
    }
}
