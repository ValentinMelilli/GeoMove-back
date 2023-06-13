import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sport } from '../sports/sport.entity';
import { Tag } from '../tags/tag.entity';

@Table
export class SportTag extends Model<SportTag> {
    @ForeignKey(() => Sport)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    sportId: number;

    @BelongsTo(() => Sport)
    sport: Sport;

    @ForeignKey(() => Tag)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    tagId: number;

    @BelongsTo(() => Tag)
    tag: Tag;
}
