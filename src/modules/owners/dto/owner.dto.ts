import { IsNotEmpty, MinLength, IsEmail, IsISO8601 } from 'class-validator';

export class OwnerDto {

    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly phone: string;
}
