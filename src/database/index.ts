import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
	name: 'default',
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'test',
	entities: ['src/database/entities/**/*.entity.ts'],
	migrations: ['src/database/migrations/**/*.ts'],
	subscribers: ['src/database/subscribers/**/*.subscriber.ts'],
	logging: true,
	synchronize: false,
});
