import navigation from '$lib/utils/stores/navigation';
import Status from '$lib/utils/enums/Status.enum';

export async function load({ data }) {
	if (data.authenticated) {
		navigation.setLoginStatus(Status.fulfilled);
	}
}
