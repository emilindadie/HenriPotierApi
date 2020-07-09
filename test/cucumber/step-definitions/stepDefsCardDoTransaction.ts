import { binding, then, when} from 'cucumber-tsflow';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { assert } from 'chai';
import { threadLocals } from './context';
import { ICard, ISecureCard } from '../../../src/models/card';
import { OneCardDto } from '../../../src/models/card/card-get-one.model';
import { ApiResponse } from '../../../src/models/api-response/api-response.model';
import { CardTransactionDto } from '../../../src/models/card/card-transaction.model';

@binding()
export class StepDefsCardDoTransaction {

    @when(/^user want to get one card of cardNumber (.*) and of expiration (.*) and of cryptogramme (.*)$/)
    public async userWantToGetOneCard(cardNumber: string, expiration: string, cryptogramme: string)  {
        const service = axios.create({
            baseURL: 'http://localhost:3000',
        });

        const dto = new OneCardDto();
        dto.cardNumber = Number(cardNumber);
        dto.cryptogramme = Number(cryptogramme);
        dto.expiration = Number(expiration);

        const response: AxiosResponse<ApiResponse<ICard[]>> = await service.post<ApiResponse<ICard[]>>('henripotier/api/cards/secure', dto);
        threadLocals.set(typeof response, response);
    }

    @when(/^user want to do a transaction of price (.*)$/)
    public async userWantToCreateACard(price: string)  {
        const service = axios.create({
            baseURL: 'http://localhost:3000',
        });
    
        const dto : CardTransactionDto = new CardTransactionDto();
        dto.amount = Number(price);
        const response: AxiosResponse<ApiResponse<ICard>> = await service.post<ApiResponse<ICard>>('henripotier/api/cards/transaction', dto);
        threadLocals.set(typeof response, response);
    }

    @then('user has done the transaction')
    public allCardIsGet() {
        let response: AxiosResponse<ApiResponse<ISecureCard>> = null;
        response = threadLocals.get(typeof response);
        assert.equal(response.status, 200);
    }
}