import { Controller, Post, HttpCode, Body, Get, UseGuards } from '@nestjs/common';
import { CardDto, ICard, OneCardDto } from '../models';
import { CardService } from '../services/card.service';
import { MyApiResponse } from '../models/api-response/api-response.model';
import { SecureCardService } from '../../src/services/secure-card.service';
import { CardTransactionDto } from '../../src/models/card/card-transaction.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@Controller('/henripotier/api/cards')
@ApiTags('henripotier/api/cards')
export class SecureCardController {

    constructor(private service: CardService, private secureService: SecureCardService) {}

    @Post()
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'The card has been create successfully'})
    @ApiBadRequestResponse({status: 424, description: 'Failed to create the card!'})
    @ApiBody({ type: CardDto , required: true})
    async create(@Body() cardDto: CardDto) : Promise<MyApiResponse<ICard>> {
        try {
            const createCardResponse = await this.service.create(cardDto);
            const apiResponse: MyApiResponse<ICard> = new MyApiResponse();
            apiResponse.data = createCardResponse;
            return apiResponse;
        } catch (e) {
            const apiResponse: MyApiResponse<ICard> = new MyApiResponse();
            apiResponse.error = { message : e.message };
            return apiResponse;
        }
    }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'The cards has been get successfully'})
    @ApiBadRequestResponse({status: 424, description: 'Failed to get cards!'})
    async getAll() {
        const getAllCardResponse =  await this.service.getAll();
        const apiResponse: MyApiResponse<ICard[]> = new MyApiResponse();
        apiResponse.data = getAllCardResponse;
        return apiResponse;
    }

    @Post('secure')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'The card has been get successfully'})
    @ApiBadRequestResponse({status: 424, description: 'Failed to get the card!'})
    @ApiBody({ type: OneCardDto , required: true})
    async getOne(@Body() oneCardDto: OneCardDto) {
        try {
            const oneCard = await this.service.getOne(oneCardDto.cardNumber, new Date(oneCardDto.expiration), oneCardDto.cryptogramme);
            const getOneCardResponse =  await this.secureService.createToken(oneCard);
            const apiResponse: MyApiResponse<ICard> = new MyApiResponse();
            apiResponse.data = getOneCardResponse.data;
            apiResponse.accessToken = getOneCardResponse.accessToken;
            return apiResponse;
        } catch (e) {
            const apiResponse: MyApiResponse<ICard> = new MyApiResponse();
            apiResponse.error = { message : e.message };
            return apiResponse;
        }
    }

    @Post('transaction')
    @HttpCode(200)
    @UseGuards(AuthGuard())
    @ApiResponse({ status: 200, description: 'The transaction has been successfully'})
    @ApiBadRequestResponse({status: 424, description: 'Failed to do the transaction!'})
    @ApiBody({ type: CardTransactionDto , required: true})
    async doTransaction(@Body() cardTransactionDto: CardTransactionDto) {
        try {
            const createTransactionResponse = await this.service.doTransaction(cardTransactionDto.cardId, cardTransactionDto.amount);
            const apiResponse: MyApiResponse<ICard> = new MyApiResponse();
            apiResponse.data = createTransactionResponse;
            return apiResponse;
        } catch (e) {
            const apiResponse: MyApiResponse<ICard> = new MyApiResponse();
            apiResponse.error = { message : e.message };
            return apiResponse;
        }
    }
}
