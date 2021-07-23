<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let isLoginOpened: boolean;
</script>

{#if isLoginOpened}
	<form transition:slide={{ duration: 200, easing: cubicInOut }}>Login Form</form>
{/if}

<style>
	form {
		display: flex;
		width: 100%;
		height: var(--size-loginbar-height);
		background-color: var(--color-grey-4);
		position: fixed;
		top: 0;
		left: 0;
		transform: translateY(var(--size-navbar-height));
		transition: transform var(--transition-default);
		z-index: var(--index-loginbar);
	}
</style>
