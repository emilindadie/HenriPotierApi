import { Controller, Post, HttpCode, Body, Get, UseGuards } from '@nestjs/common';
import { CardDto, ICard, OneCardDto } from '../models';
import { CardService } from '../services/card.service';
import { ApiResponse } from '../models/api-response/api-response.model';
import { SecureCardService } from '../../src/services/secure-card.service';
import { CardTransactionDto } from '../../src/models/card/card-transaction.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('/henripotier/api/cards')
export class SecureCardController {

    constructor(private service: CardService, private secureService: SecureCardService) {}

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

    @Post('secure')
    @HttpCode(200)
    async getOne(@Body() oneCardDto: OneCardDto) {
        try {
            const oneCard = await this.service.getOne(oneCardDto.cardNumber, new Date(oneCardDto.expiration), oneCardDto.cryptogramme);
            const getOneCardResponse =  await this.secureService.createToken(oneCard);
            const apiResponse: ApiResponse<ICard> = new ApiResponse();
            apiResponse.data = getOneCardResponse.data;
            apiResponse.accessToken = getOneCardResponse.accessToken;
            return apiResponse;
        } catch (e) {
            const apiResponse: ApiResponse<ICard> = new ApiResponse();
            apiResponse.error = { message : e.message };
            return apiResponse;
        }
    }

    @Post('transaction')
    @HttpCode(200)
    @UseGuards(AuthGuard())
    async doTransaction(@Body() cardTransactionDto: CardTransactionDto) {
        try {
            const createTransactionResponse = await this.service.doTransaction(cardTransactionDto.id, cardTransactionDto.amount);
            const apiResponse: ApiResponse<ICard> = new ApiResponse();
            apiResponse.data = createTransactionResponse;
            return apiResponse;
        } catch (e) {
            const apiResponse: ApiResponse<ICard> = new ApiResponse();
            apiResponse.error = { message : e.message };
            return apiResponse;
        }
    }
}
