import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Structure } from '../structures/structure.entity';

@Table
export class Owner extends Model<Owner> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: Owner;

    @HasOne(() => Structure)
    structure: Structure;
}
