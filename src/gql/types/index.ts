import { Request } from 'express';

export * from './user.type';

export type MyContext = {
	req: Request;
};

// export const IdScaler = new Gra();
