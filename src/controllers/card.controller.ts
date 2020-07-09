import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { CardDto } from 'src/models';
import { CardService } from 'src/services/card.service';

@Controller('/henripotier/api/cards')
export class CardController {

    constructor(private service: CardService) {}

    @Post()
    @HttpCode(201)
    create(@Body() cardDto: CardDto) {
        console.log(cardDto);
        return this.service.create(cardDto);
    }
}
