import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { CardDto } from '../models';
import { CardService } from '../services/card.service';

@Controller('/henripotier/api/cards')
export class CardController {

    constructor(private service: CardService) {}

    @Post()
    @HttpCode(201)
    create(@Body() cardDto: CardDto) {
        return this.service.create(cardDto);
    }

    @Get()
    @HttpCode(200)
    getAll() {
        return this.service.getAll();
    }
}
