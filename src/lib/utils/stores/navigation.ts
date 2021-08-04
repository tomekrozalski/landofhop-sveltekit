import { writable, Writable } from 'svelte/store';
import Status from '$lib/utils/enums/Status.enum';

const {
	subscribe,
	update,
	set
}: Writable<{
	isNavigationOpened: boolean;
	isLoginOpened: boolean;
	isLoggedIn: boolean;
	loginStatus: Status;
}> = writable({
	isNavigationOpened: false,
	isLoginOpened: false,
	isLoggedIn: false,
	loginStatus: Status.idle
});

function close() {
	update((store) => {
		store.isNavigationOpened = false;
		store.isLoginOpened = false;

		return store;
	});
}

function toggleNavbar() {
	update((store) => {
		store.isNavigationOpened = !store.isNavigationOpened;
		store.isLoginOpened = false;

		return store;
	});
}

function toggleLoginbar() {
	update((store) => {
		store.isLoginOpened = !store.isLoginOpened;

		return store;
	});
}

function closeLoginbar() {
	update((store) => {
		store.isLoginOpened = false;

		return store;
	});
}

function setLoginStatus(status: Status) {
	if (status !== Status.fulfilled) {
		document.cookie = 'accessToken=; Max-Age=0';
		document.cookie = 'refreshToken=; Max-Age=0';
	}

	update((store) => {
		store.loginStatus = status;
		store.isLoggedIn = status === Status.fulfilled;

		return store;
	});
}

export default {
	close,
	closeLoginbar,
	set,
	setLoginStatus,
	subscribe,
	toggleLoginbar,
	toggleNavbar
};
