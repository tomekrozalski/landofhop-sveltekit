<script lang="ts">
	import navigation from '$lib/utils/stores/navigation';

	import Header from './header/header.svelte';
	import Navigation from './navigation/navigation.svelte';
	import Login from './login/login.svelte';
</script>

<Header />
{#if $navigation.isNavigationOpened}
	<Navigation />
{/if}
{#if $navigation.isLoginOpened}
	<Login />
{/if}
