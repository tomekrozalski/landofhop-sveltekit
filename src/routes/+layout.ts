import type { LayoutLoad } from './$types';
import authentication from '$lib/utils/stores/authentication';
import Status from '$lib/utils/enums/Status.enum';

export const load: LayoutLoad = async ({ data }) => {
	if (data.authenticated) {
		authentication.setLoginStatus(Status.fulfilled);
	}

	return data;
};
