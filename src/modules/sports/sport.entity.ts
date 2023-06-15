import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Tag } from '../tags/tag.entity';
import { SportTag } from '../sports_tags/sport_tag.entity';

@Table
export class Sport extends Model<Sport> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;

    @BelongsToMany(() => Tag, () => SportTag)
    tags: Tag[];
}
