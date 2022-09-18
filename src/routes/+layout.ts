import authentication from '$lib/utils/stores/authentication';
import Status from '$lib/utils/enums/Status.enum';

export async function load({ data }) {
	if (data.authenticated) {
		authentication.setLoginStatus(Status.fulfilled);
	}
}
