import {IsDate, IsNumber, IsNotEmpty, Validate} from "class-validator";
import { CustomTextLengthValidation } from "../../../src/validations/card-length.validation";
import { Type } from 'class-transformer';
import "reflect-metadata";

export class CardDto {
    @IsNumber()
    @IsNotEmpty()
    @Validate(CustomTextLengthValidation, [9]) 
    cardNumber: number;
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    expiration: number;
    @IsNotEmpty()
    @IsNumber()
    @Validate(CustomTextLengthValidation, [3])
    cryptogramme: number;
    @IsNotEmpty()
    @IsNumber()
    solde: number;
}
