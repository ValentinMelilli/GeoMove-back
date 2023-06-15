import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

import { Structure } from '../structures/structure.entity';

@Table
export class Category extends Model<Category> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;

    @HasMany(() => Structure)
    structures: Structure[];
}
