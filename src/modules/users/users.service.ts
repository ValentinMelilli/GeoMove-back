import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { Owner } from '../owners/owner.entity';
import { USER_REPOSITORY } from '../../core/constants';
import { Structure } from '../structures/structure.entity';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({
            where: { email: email },
            include: [{ model: Owner, attributes: ['id'], include: [{ model: Structure, attributes: ['id'] }] }]
        });
    }

    async findOneByUsername(name: string): Promise<User> {
        return await this.userRepository.findOne<User>({
            where: { name: name },
            include: [{ model: Owner, attributes: ['id'], include: [{ model: Structure, attributes: ['id'] }] }]
        });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({
            where: { id: id },
            include: [{ model: Owner, attributes: ['id'], include: [{ model: Structure, attributes: ['id'] }] }]
        });
    }
}
