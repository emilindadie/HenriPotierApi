import {IsDate, IsNumber, IsNotEmpty, Validate} from "class-validator";
import { CustomTextLengthValidation } from "../../validations/card-length.validation";
import { Type } from 'class-transformer';
import "reflect-metadata";
import { ApiProperty } from '@nestjs/swagger';

export class CardDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Validate(CustomTextLengthValidation, [9]) 
    cardNumber: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    expiration: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Validate(CustomTextLengthValidation, [3])
    cryptogramme: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    solde: number;
}
