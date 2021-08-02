import { writable } from 'svelte/store';

const { subscribe, update, set } = writable({
	isNavigationOpened: false,
	isLoginOpened: false,
	isLoggedIn: false
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

function logIn() {
	update((store) => {
		store.isLoggedIn = true;

		return store;
	});
}

function logOut() {
	// @ToDo: remove cookies
	update((store) => {
		store.isLoggedIn = false;

		return store;
	});
}

export default {
	close,
	closeLoginbar,
	logIn,
	logOut,
	set,
	subscribe,
	toggleLoginbar,
	toggleNavbar
};
