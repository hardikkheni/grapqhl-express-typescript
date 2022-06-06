import { TableColumnOptions } from 'typeorm';

export const autoIncrementPrimaryColumn: TableColumnOptions = {
	name: 'id',
	type: 'int',
	// isPrimary: true,
	generationStrategy: 'increment',
	isGenerated: true,
};

export const createdAtColumn: TableColumnOptions = {
	name: 'createdAt',
	type: 'timestamp',
	isNullable: true,
};

export const updatedAtColumn: TableColumnOptions = {
	name: 'updatedAt',
	type: 'timestamp',
	isNullable: true,
};
