import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { CardDto, ICard } from '../models';
import { CardService } from '../services/card.service';
import { ApiResponse } from 'src/models/api-response/api-response';

@Controller('/henripotier/api/cards')
export class CardController {

    constructor(private service: CardService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() cardDto: CardDto) : Promise<ApiResponse<ICard>> {
        try {
            const createCardResponse = await this.service.create(cardDto);
            return { data : createCardResponse, error: null};
        } catch (e) {
            return { data: null, error: { message : e.message }};
        }
    }

    @Get()
    @HttpCode(200)
    async getAll() {
        const getAllCardResponse =  await this.service.getAll();
        return { data : getAllCardResponse , error: null};
    }
}
