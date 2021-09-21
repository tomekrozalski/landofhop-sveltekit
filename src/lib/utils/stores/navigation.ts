import { writable, Writable } from 'svelte/store';
import Status from '$lib/utils/enums/Status.enum';
import setSearchParam from '$lib/utils/helpers/setSearchParam';

const {
	subscribe,
	update,
	set
}: Writable<{
	isNavigationOpened: boolean;
	isLoginOpened: boolean;
	isLoggedIn: boolean;
	isSearchbarActive: boolean;
	loginStatus: Status;
	searchPhrase: string;
}> = writable({
	isNavigationOpened: false,
	isLoginOpened: false,
	isLoggedIn: false,
	isSearchbarActive: false,
	loginStatus: Status.idle,
	searchPhrase: ''
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
	update((store) => {
		store.loginStatus = status;
		store.isLoggedIn = status === Status.fulfilled;

		return store;
	});
}

function openSearchBar() {
	console.log('openSearchBar');
	update((store) => {
		store.isSearchbarActive = true;
		store.isNavigationOpened = false;
		store.isLoginOpened = false;

		return store;
	});
}

function closeSearchBar() {
	setSearchParam('');

	update((store) => {
		store.isSearchbarActive = false;
		store.searchPhrase = '';

		return store;
	});
}

function setSearchPhrase(value: string) {
	update((store) => {
		if (value) {
			store.isSearchbarActive = true;
		}
		store.searchPhrase = value;

		return store;
	});
}

export default {
	close,
	closeLoginbar,
	closeSearchBar,
	openSearchBar,
	set,
	setLoginStatus,
	setSearchPhrase,
	subscribe,
	toggleLoginbar,
	toggleNavbar
};
