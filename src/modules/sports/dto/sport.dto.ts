import internal = require('assert');
import { IsNotEmpty } from 'class-validator';

export class SportDto {

    @IsNotEmpty()
    readonly name: string;
}
