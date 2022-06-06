import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import cors from 'cors';
import session from 'express-session';
import { dataSource } from './database';
import { resolvers } from './gql/resolvers';
import { MyContext, User } from './gql/types';
import { authChecker } from './gql/auth-checker';

declare module 'express-session' {
	interface SessionData {
		user: { [K in keyof User]: string | number | null } | null;
	}
}

export default async () => {
	const app = express();

	app.use(
		cors({
			credentials: true,
			origin: '*',
		})
	);

	app.set('trust proxy', 1);
	app.use(
		session({
			name: 'gid',
			secret: 'aslkdfjoiq12312',
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
			},
		})
	);

	await dataSource.initialize();

	const schema = await buildSchema({
		resolvers: resolvers,
		container: Container,
		validate: false,
		authChecker,
	});

	const server = new ApolloServer({
		schema,
		context: ({ req }: MyContext) => ({ req }),
		plugins: [
			process.env.NODE_ENV === 'production'
				? ApolloServerPluginLandingPageProductionDefault()
				: ApolloServerPluginLandingPageGraphQLPlayground(),
		],
	});

	await server.start();
	server.applyMiddleware({ app });

	app.get('/', (_, res) => {
		return res.json({
			status: 200,
			message: `Server is up and running at http://localhost:3000`,
		});
	});

	return app;
};
