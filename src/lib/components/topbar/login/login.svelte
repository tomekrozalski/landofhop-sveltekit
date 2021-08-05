<script lang="ts">
	import { slide } from 'svelte/transition';
	import { translations } from 'svelte-intl';
	import { cubicInOut } from 'svelte/easing';
	import loginbarDictionary from '$lib/utils/dictionary/loginbar.json';
	import navigation from '$lib/utils/stores/navigation';
	import Status from '$lib/utils/enums/Status.enum';
	import ErrorMessage from './errorMessage.svelte';
	import LoginForm from './loginForm.svelte';
	import SuccessMessage from './successMessage.svelte';

	translations.update(loginbarDictionary);
</script>

{#if $navigation.isLoginOpened}
	<section transition:slide={{ duration: 200, easing: cubicInOut }}>
		{#if $navigation.loginStatus === Status.fulfilled}
			<SuccessMessage />
		{:else if $navigation.loginStatus === Status.rejected}
			<ErrorMessage />
		{:else}
			<LoginForm />
		{/if}
	</section>
{/if}

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
