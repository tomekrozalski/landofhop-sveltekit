import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from '@sveltejs/kit';

export const load: LayoutLoad = ({ session }) => {
	if (!session.isLoggedIn) {
		throw redirect(302, '/');
	}

	return ;
};
