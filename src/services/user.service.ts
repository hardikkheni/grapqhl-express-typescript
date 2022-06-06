import { UserRepository } from '../database/repositories';
import { Inject, Service } from 'typedi';
import { NewUserInput } from 'src/gql/types/user.type';
import bcrypt from 'bcrypt';

@Service()
export class UserService {
	@Inject()
	readonly userRepo!: UserRepository;

	users() {
		return this.userRepo.find({});
	}

	findById(id: number) {
		return this.userRepo.findOneBy({ id });
	}

	create(input: NewUserInput) {
		return this.userRepo.save(input);
	}

	findByEmailOrFail(email: string) {
		return this.userRepo.findByEmailOrFail(email);
	}

	async logIn(email: string, password: string) {
		const user = await this.userRepo.findByEmailWithPassword(email);
		if (!user) return null;
		try {
			if (await bcrypt.compare(password, user.password)) {
				return user;
			}
		} catch {}
		return null;
	}
}
