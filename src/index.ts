import 'reflect-metadata';
import bootstrap from './bootstrap';

const PORT = process.env.PORT || 3000;

bootstrap().then((app) => {
	app.listen(PORT, () => {
		console.log(` 
    ***************************************
    *                                     *
    *      Server up & running on         *
    *      http://localhost:${PORT}          *
    *                                     * 
    ***************************************
    `);
	});
});

declare module 'express' {
	export interface Request {
		user?: import('./gql/types').User;
	}
}
