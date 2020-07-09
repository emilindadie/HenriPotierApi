import {IsNumber, IsNotEmpty} from "class-validator";;
import "reflect-metadata";

export class CardTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}