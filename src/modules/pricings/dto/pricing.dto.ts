import internal = require('assert');
import { IsNotEmpty } from 'class-validator';

export class PricingDto {

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly sportId: number;

    @IsNotEmpty()
    readonly periodicityId: number;
}
