<script lang="ts">
	import navigation from '$lib/utils/stores/navigation';

	import Header from './Header/Header.svelte';
	import Navigation from './Navigation/Navigation.svelte';
	import Login from './Login/Login.svelte';
</script>

<Header />
{#if $navigation.isNavigationOpened}
	<Navigation />
{/if}
{#if $navigation.isLoginOpened}
	<Login />
{/if}
