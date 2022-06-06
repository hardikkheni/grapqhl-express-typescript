import { UserService } from '../../services';
import {
	Arg,
	Authorized,
	Ctx,
	ID,
	Mutation,
	Query,
	Resolver,
} from 'type-graphql';
import { MyContext, NewUserInput, User } from '../types';
import { Inject, Service } from 'typedi';

@Service()
@Resolver(User)
export class UserResolver {
	@Inject()
	readonly userService!: UserService;

	@Query((_) => [User])
	users() {
		return this.userService.users();
	}

	@Query((_) => User, { nullable: true })
	user(@Arg('id') id: number) {
		return this.userService.findById(id);
	}

	@Mutation((_) => User)
	async addUser(
		@Arg('newUserInput', { validate: true }) newUserInput: NewUserInput
	) {
		return await this.userService.create(newUserInput);
	}

	@Query((_) => User, { nullable: true })
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() ctx: MyContext
	) {
		const user = await this.userService.logIn(email, password);
		ctx.req.session.user = user?.toJson();
		return user;
	}

	@Query((_) => ID, { nullable: true })
	logOut(@Ctx() ctx: MyContext) {
		ctx.req.session.user = null;
		return null;
	}

	@Query((_) => User)
	@Authorized()
	async profile(@Ctx() ctx: MyContext) {
		const user = await this.userService.findById(
			ctx.req.session.user?.id as number
		);
		ctx.req.session.user = user?.toJson();
		return user;
	}
}
