import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Tag extends Model<Tag> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;
}
