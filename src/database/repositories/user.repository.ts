import { Service } from 'typedi';
import { User as UserEntity } from '../entities';
import { Repository } from './base.repository';

@Service()
export class UserRepository extends Repository(UserEntity) {
	findByEmailOrFail(email: string) {
		return this.findOneByOrFail({ email });
	}

	findByEmailWithPassword(email: string) {
		return this.createQueryBuilder('user')
			.where({ email })
			.addSelect('user.password')
			.getOne();
	}
}
