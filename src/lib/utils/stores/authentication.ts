import { writable } from 'svelte/store';
import Status from '$lib/utils/enums/Status.enum';

const { subscribe, update, set } = writable<{
	isLoggedIn: boolean;
	loginStatus: Status;
}>({
	isLoggedIn: false,
	loginStatus: Status.idle
});

function logOut() {
	update((store) => {
		store.isLoggedIn = false;
		store.loginStatus = Status.idle;

		return store;
	});
}

function setLoginStatus(status: Status) {
	update((store) => {
		store.isLoggedIn = status === Status.fulfilled;
		store.loginStatus = status;

		return store;
	});
}

export default {
	logOut,
	set,
	setLoginStatus,
	subscribe
};
