import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

import { Sport } from '../sports/sport.entity';

@Table
export class Category extends Model<Category> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;

    @HasMany(() => Sport)
    sports: Sport[];
}
