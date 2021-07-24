<script lang="ts">
	import Header from './header/header.svelte';
	import Navigation from './navigation/navigation.svelte';
	import Login from './login/login.svelte';

	let isNavigationOpened = true;
	let isLoginOpened = true;

	function closeNavigation() {
		isNavigationOpened = false;
		isLoginOpened = false;
	}
</script>

<Header bind:isNavigationOpened bind:isLoginOpened {closeNavigation} />
<Navigation {isNavigationOpened} bind:isLoginOpened {closeNavigation} />
<Login bind:isLoginOpened />
