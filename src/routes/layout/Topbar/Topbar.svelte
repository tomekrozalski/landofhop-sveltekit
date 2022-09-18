<script lang="ts">
	import storeLayout from '../store';
	import Header from './Header/Header.svelte';
	import Navigation from './Navigation/Navigation.svelte';
	import Login from './Login/Login.svelte';
</script>

<Header />
{#if $storeLayout.isNavigationOpened}
	<Navigation />
{/if}
{#if $storeLayout.isLoginOpened}
	<Login />
{/if}
