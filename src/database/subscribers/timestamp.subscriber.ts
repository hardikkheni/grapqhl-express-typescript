import dayjs from 'dayjs';
import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	UpdateEvent,
} from 'typeorm';
import { createdAtColumn, updatedAtColumn } from '../constant';

@EventSubscriber()
export class TimeStampSubscriber implements EntitySubscriberInterface<any> {
	beforeInsert(event: InsertEvent<any>) {
		if (
			(event.metadata.propertiesMap as Object).hasOwnProperty(
				createdAtColumn.name
			)
		) {
			event.entity[createdAtColumn.name] = dayjs();
		}
	}

	beforeUpdate(event: UpdateEvent<any>) {
		if (
			event.entity &&
			(event.metadata.propertiesMap as Object).hasOwnProperty(
				updatedAtColumn.name
			)
		) {
			event.entity[updatedAtColumn.name] = dayjs();
		}
	}
}
