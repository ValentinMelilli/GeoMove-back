import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript';
import { Category } from '../categories/category.entity';

@Table
export class Sport extends Model<Sport> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;

    @BelongsTo(() => Category)
    category: Category;
}
