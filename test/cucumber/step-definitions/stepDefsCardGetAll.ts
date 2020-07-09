import { binding, then, when} from 'cucumber-tsflow';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { assert } from 'chai';
import { threadLocals } from './context';
import { CardDto, ICard } from '../../../src/models/card';

@binding()
export class StepDefsCardGetAll {

    @when('user want to get all card')
    public async userWantTogetAllCard()  {
        const service = axios.create({
            baseURL: 'http://localhost:3000',
        });
        const response: AxiosResponse<ICard[]> = await service.get<ICard[]>('henripotier/api/cards', threadLocals.get(CardDto));
        threadLocals.set(typeof response, response);
    }

    @then('all card is get')
    public allCardIsGet() {
        let response: AxiosResponse<ICard[]> = null;
        response = threadLocals.get(typeof response);
        assert.equal(response.status, 200);
    }
}
