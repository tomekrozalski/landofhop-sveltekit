<script lang="ts">
	import { slide } from 'svelte/transition';
	import { translations } from 'svelte-intl';
	import { cubicInOut } from 'svelte/easing';
	import { Status } from '$types/enums/Globals.enum';
	import commonFormsDictionary from '$lib/utils/dictionary/form.json';
	import authentication from '$lib/utils/stores/authentication';
	import ErrorMessage from './ErrorMessage.svelte';
	import LoginForm from './LoginForm/LoginForm.svelte';
	import SuccessMessage from './SuccessMessage.svelte';
	import loginbarDictionary from './dictionary.json';

	translations.update(loginbarDictionary);
	translations.update(commonFormsDictionary);
</script>

<section transition:slide={{ duration: 200, easing: cubicInOut }}>
	{#if $authentication.loginStatus === Status.fulfilled}
		<SuccessMessage />
	{:else if $authentication.loginStatus === Status.rejected}
		<ErrorMessage />
	{:else}
		<LoginForm />
	{/if}
</section>

<style>
	section {
		display: flex;
		width: 100%;
		background-color: var(--color-grey-4);
		position: fixed;
		top: var(--size-navbar-height);
		left: 0;
		z-index: var(--index-loginbar);
	}

	section > :global(*) {
		display: flex;
		width: var(--size-container-max-width);
		height: var(--size-loginbar-height);
		margin: 0 auto;
		padding: 1rem 2rem;
		position: relative;
	}
</style>
