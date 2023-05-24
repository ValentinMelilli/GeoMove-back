import { IsNotEmpty, MinLength, IsEmail, IsISO8601 } from 'class-validator';

export class UserDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsISO8601({ strict: true })
    readonly birthdate: string;
}
