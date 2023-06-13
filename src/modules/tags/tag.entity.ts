import { Table, Column, Model, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Sport } from '../sports/sport.entity';
import { SportTag } from '../sports_tags/sport_tag.entity';

@Table
export class Tag extends Model<Tag> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;

    @BelongsToMany(() => Sport, () => SportTag)
    sports: Sport[];
}
