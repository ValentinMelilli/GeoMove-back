import internal = require('assert');
import { IsNotEmpty } from 'class-validator';

export class PeriodicityDto {

    @IsNotEmpty()
    readonly name: string;
}
