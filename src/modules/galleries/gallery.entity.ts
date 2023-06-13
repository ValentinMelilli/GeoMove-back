import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { Structure } from '../structures/structure.entity';

@Table
export class Gallery extends Model<Gallery> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image: string;

    @ForeignKey(() => Structure)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    structureId: number;

    @BelongsTo(() => Structure)
    structure: Structure;
}
