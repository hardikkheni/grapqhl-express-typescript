import { Length } from 'class-validator';
import {
	Field,
	GraphQLISODateTime,
	InputType,
	Int,
	ObjectType,
} from 'type-graphql';

@ObjectType()
export class User {
	@Field((_) => Int)
	id!: number;

	@Field()
	username!: string;

	@Field()
	email!: string;

	@Field(() => Int)
	age!: number;

	@Field(() => GraphQLISODateTime, { nullable: true })
	createdAt?: Date;

	@Field(() => GraphQLISODateTime, { nullable: true })
	updatedAt?: Date;
}

@InputType()
export class NewUserInput {
	@Field()
	@Length(1, 255)
	username!: string;

	@Field()
	@Length(1, 255)
	email!: string;

	@Field(() => Int)
	age!: number;

	@Field()
	@Length(8, 255)
	password!: string;
}
