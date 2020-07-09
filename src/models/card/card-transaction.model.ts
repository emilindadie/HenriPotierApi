import {IsNumber, IsNotEmpty} from "class-validator";;
import "reflect-metadata";

export class CardTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}