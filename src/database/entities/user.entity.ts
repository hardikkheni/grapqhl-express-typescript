import dayjs from 'dayjs';
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'username', type: 'varchar' })
	username!: string;

	@Column({ name: 'email', type: 'varchar' })
	@Index({ unique: true })
	email!: string;

	@Column({ name: 'password', type: 'varchar', select: false })
	password!: string;

	@Column({ name: 'age', type: 'int' })
	age!: number;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	toJson() {
		return {
			...this,
			createdAt: this.createdAt && dayjs(this.createdAt).format(),
			updatedAt: this.updatedAt && dayjs(this.updatedAt).format(),
		};
	}
}
