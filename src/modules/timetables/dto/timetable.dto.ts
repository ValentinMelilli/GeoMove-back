import internal = require('assert');

export class TimetableDto {

    readonly morning_start: string;

    readonly morning_end: string;

    readonly afternoon_start: string;

    readonly afternoon_end: string;

    readonly day: number;
}
