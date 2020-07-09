import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { CardDto, ICard } from '../models';
import { CardService } from '../services/card.service';
import { ApiResponse } from '../../src/models/api-response/api-response.model';

@Controller('/henripotier/api/cards')
export class CardController {

    constructor(private service: CardService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() cardDto: CardDto) : Promise<ApiResponse<ICard>> {
        try {
            const createCardResponse = await this.service.create(cardDto);
            const apiResponse: ApiResponse<ICard> = new ApiResponse();
            apiResponse.data = createCardResponse;
            return apiResponse;
        } catch (e) {
            const apiResponse: ApiResponse<ICard> = new ApiResponse();
            apiResponse.error = { message : e.message };
            return apiResponse;
        }
    }

    @Get()
    @HttpCode(200)
    async getAll() {
        const getAllCardResponse =  await this.service.getAll();
        const apiResponse: ApiResponse<ICard[]> = new ApiResponse();
        apiResponse.data = getAllCardResponse;
        return apiResponse;
    }
}
