<script lang="ts">
	export let isLoginOpened: boolean;

	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import Status from '$lib/utils/enums/Status.enum';
	import ErrorMessage from './errorMessage.svelte';
	import LoginForm from './loginForm.svelte';
	import SuccessMessage from './successMessage.svelte';

	let status = Status.idle;
</script>

{#if isLoginOpened}
	<section transition:slide={{ duration: 200, easing: cubicInOut }}>
		{#if status === Status.fulfilled}
			<SuccessMessage bind:isLoginOpened />
		{:else if status === Status.rejected}
			<ErrorMessage bind:status />
		{:else}
			<LoginForm bind:status />
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
