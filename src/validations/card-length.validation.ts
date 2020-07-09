import { ValidatorConstraintInterface, ValidatorConstraint, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "cardLength", async: false })
export class CustomTextLengthValidation implements ValidatorConstraintInterface {

    validate(text: number | string, args: ValidationArguments) {
        return text.toString().length === args.constraints[0]; 
    }

    defaultMessage(args: ValidationArguments) { 
        return `Length of number ${args.value} should be equal to ${args.constraints[0]}!`;
    }
}