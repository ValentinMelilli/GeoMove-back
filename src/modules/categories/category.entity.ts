import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Category extends Model<Category> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;
}
