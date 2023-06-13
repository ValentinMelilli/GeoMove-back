import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { Owner } from '../owners/owner.entity';
import { Structure } from '../structures/structure.entity';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;
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
    password: string;
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    birthdate: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    profilePicture: string;

    @HasOne(() => Owner)
    owner: Owner;
}
