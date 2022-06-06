import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
	autoIncrementPrimaryColumn,
	createdAtColumn,
	updatedAtColumn,
} from '../constant';

export class CreateUserTable1654323828581 implements MigrationInterface {
	#table: string = 'users';
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: this.#table,
				columns: [
					autoIncrementPrimaryColumn,
					{ name: 'username', type: 'varchar' },
					{ name: 'email', type: 'varchar', isUnique: true },
					{ name: 'password', type: 'varchar' },
					{ name: 'age', type: 'int' },
					createdAtColumn,
					updatedAtColumn,
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.#table);
	}
}
