import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Structure } from '../structures/structure.entity';
import { Sport } from '../sports/sport.entity';
import { Periodicity } from '../periodicity/periodicity.entity';

@Table
export class Pricing extends Model<Pricing> {
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;

    @ForeignKey(() => Structure)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    structureId: number;

    @BelongsTo(() => Structure)
    structure: Structure;

    @ForeignKey(() => Sport)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    sportId: number;

    @BelongsTo(() => Sport)
    sport: Sport;

    @ForeignKey(() => Periodicity)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    periodicityId: number;

    @BelongsTo(() => Periodicity)
    periodicity: Periodicity;
}
