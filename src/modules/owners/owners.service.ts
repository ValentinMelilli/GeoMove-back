import { Injectable, Inject } from '@nestjs/common';

import { Owner } from './owner.entity';
import { OwnerDto } from './dto/owner.dto';
import { User } from '../users/user.entity';
import { Structure } from '../structures/structure.entity';
import { OWNER_REPOSITORY } from '../../core/constants';

@Injectable()
export class OwnersService {
    constructor(@Inject(OWNER_REPOSITORY) private readonly ownerRepository: typeof Owner) { }

    async create(owner: OwnerDto, userId): Promise<Owner> {
        return await this.ownerRepository.create<Owner>({ ...owner, userId });
    }

    async findAll(): Promise<Owner[]> {
        return await this.ownerRepository.findAll<Owner>({
            include: [{ model: User, attributes: { exclude: ['password'] } }, { model: Structure }],
        });
    }

    async findOne(id): Promise<Owner> {
        return await this.ownerRepository.findOne({
            where: { id },
            include: [{ model: User, attributes: { exclude: ['password'] } }, { model: Structure }],
        });
    }

    async delete(id, userId) {
        return await this.ownerRepository.destroy({ where: { id, userId } });
    }

    async update(id, data, userId) {
        const [numberOfAffectedRows, [updatedOwner]] = await this.ownerRepository.update({ ...data }, { where: { id, userId }, returning: true });
        return { numberOfAffectedRows, updatedOwner };
    }
}
