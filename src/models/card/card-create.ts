import {IsDate, IsNumber, ValidateIf, IsNotEmpty} from "class-validator";

export class CardDto {
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf(o => o.length === 9)
    number: number;
    @IsNotEmpty()
    @IsDate()
    expiration: Date;
    @IsNotEmpty()
    @IsNumber()
    @ValidateIf(o => o.length === 3)
    cryptogramme: number;
}
