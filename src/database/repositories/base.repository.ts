import { EntityTarget, Repository as Repo } from 'typeorm';
import { dataSource } from '..';

export const Repository = <Entity>(target: EntityTarget<Entity>) => {
	return class extends Repo<Entity> {
		constructor() {
			super(target, dataSource.createEntityManager());
		}
	};
};
