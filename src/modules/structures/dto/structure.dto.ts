import internal = require('assert');
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class StructureDto {

    @IsNotEmpty()
    @MinLength(4)
    readonly name: string;

    @IsNotEmpty()
    readonly description: string;

    readonly profilePicture: string;

    @IsNotEmpty()
    readonly address: string;

    @IsNotEmpty()
    readonly city: string;

    @IsNotEmpty()
    readonly zip: number;

    @IsNotEmpty()
    readonly coord: string;

    @IsNotEmpty()
    readonly phone: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly website: string;
}
