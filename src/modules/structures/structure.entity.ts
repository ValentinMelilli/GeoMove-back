import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

import { Owner } from '../owners/owner.entity';

@Table
export class Structure extends Model<Structure> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    city: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    zip: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            is: /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/i
        },
    })
    coord: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    phone: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    })
    email: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            isUrl: true,
        },
    })
    website: string;

    @ForeignKey(() => Owner)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ownerId: number;

    @BelongsTo(() => Owner)
    owner: Owner;
}
