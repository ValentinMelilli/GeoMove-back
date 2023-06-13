import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Periodicity extends Model<Periodicity> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;
}
