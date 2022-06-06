import { AuthChecker } from 'type-graphql';
import { MyContext } from './types';

export const authChecker: AuthChecker<MyContext> = ({
	context: ctx,
}: {
	context: MyContext;
}) => {
	if (ctx.req.session.user) return true;
	return false;
};
