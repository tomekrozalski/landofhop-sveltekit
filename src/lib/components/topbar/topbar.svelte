<script lang="ts">
	import Header from './header/header.svelte';
	import Navigation from './navigation/navigation.svelte';

	let isNavigationOpened = false;
	let isLoginOpened = false;
</script>

<Header bind:isNavigationOpened bind:isLoginOpened />
<Navigation bind:isNavigationOpened bind:isLoginOpened />
