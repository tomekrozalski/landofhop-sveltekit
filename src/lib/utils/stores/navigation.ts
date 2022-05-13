import { writable } from 'svelte/store';
import pushState from '$lib/utils/helpers/pushState';
import Status from '$lib/utils/enums/Status.enum';

const { subscribe, update, set } = writable<{
	isNavigationOpened: boolean;
	isLoading: boolean;
	isLoginOpened: boolean;
	isSearchbarActive: boolean;
	loginStatus: Status;
	searchPhrase: string;
}>({
	isNavigationOpened: false,
	isLoading: false,
	isLoginOpened: false,
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

		return store;
	});
}

function openSearchBar() {
	update((store) => {
		store.isSearchbarActive = true;
		store.isNavigationOpened = false;
		store.isLoginOpened = false;

		return store;
	});
}

function closeSearchBar() {
	const params = new URLSearchParams(location.search);
	params.delete('search');
	pushState(params);

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
