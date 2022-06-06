import { hash } from 'bcrypt';
import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	UpdateEvent,
} from 'typeorm';
import { User } from '../entities';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
	listenTo() {
		return User;
	}

	async beforeInsert(event: InsertEvent<User>) {
		await this.hashPassword(event);
	}

	async beforeUpdate(event: UpdateEvent<User>) {
		await this.hashPassword(event);
	}

	async hashPassword(event: InsertEvent<User> | UpdateEvent<User>) {
		if (event.entity?.password) {
			event.entity.password = await hash(event.entity.password, 10);
		}
	}
}
