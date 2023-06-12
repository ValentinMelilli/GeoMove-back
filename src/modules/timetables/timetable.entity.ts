import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

import { Structure } from '../structures/structure.entity';

@Table
export class Timetable extends Model<Timetable> {
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    morning_start: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    morning_end: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    afternoon_start: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    afternoon_end: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    day: number;

    @ForeignKey(() => Structure)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    structureId: number;

    @BelongsTo(() => Structure)
    structure: Structure;
}
