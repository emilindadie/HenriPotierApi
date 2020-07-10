import {IsNumber, IsNotEmpty} from "class-validator";;
import "reflect-metadata";
import { ApiProperty } from "@nestjs/swagger";

export class CardTransactionDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cardId: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}