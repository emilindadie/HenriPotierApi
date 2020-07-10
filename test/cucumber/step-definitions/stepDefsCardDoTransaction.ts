import { binding, then, when} from 'cucumber-tsflow';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { assert } from 'chai';
import { threadLocals } from './context';
import { ICard, ISecureCard } from '../../../src/models/card';
import { MyApiResponse } from '../../../src/models/api-response/api-response.model';
import { CardTransactionDto } from '../../../src/models/card/card-transaction.model';

@binding()
export class StepDefsCardDoTransaction {

    @when(/^user want to do a transaction of price (.*)$/)
    public async userWantToCreateACard(price: string)  {
        const typeToFind: AxiosResponse<MyApiResponse<ICard>>  = null;
        const oneCardResponse: AxiosResponse<MyApiResponse<ICard>>  = threadLocals.get(typeof typeToFind);
        const service = axios.create({
            baseURL: 'http://localhost:3000',
            headers: {
                'Authorization': `Bearer ${oneCardResponse.data.accessToken}`
            }
        });
    
        const dto : CardTransactionDto = new CardTransactionDto();
        dto.cardId = oneCardResponse.data.data.id;
        dto.amount = Number(price);
        const response: AxiosResponse<MyApiResponse<ICard>> = await service.post<MyApiResponse<ICard>>('henripotier/api/cards/transaction', dto);
        threadLocals.set(typeof response, response);
    }

    @then('user has done the transaction')
    public transactionIsDone() {
        let response: AxiosResponse<MyApiResponse<ISecureCard>> = null;
        response = threadLocals.get(typeof response);
        assert.equal(response.status, 200);
    }
}