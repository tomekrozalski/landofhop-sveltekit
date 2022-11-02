<script lang="ts">
	import { fade } from 'svelte/transition';
	import { translate } from 'svelte-intl';
	import pushState from '$lib/utils/helpers/pushState';
	import layoutStore from '../../../store';

	function focusOnMount(input: HTMLInputElement) {
		input.focus();
	}
</script>

<input
	on:input={(e) => {
		const params = new URLSearchParams(location.search);
		params.set('search', e.currentTarget.value);
		pushState(params);
	}}
	type="text"
	use:focusOnMount
	bind:value={$layoutStore.searchPhrase}
	transition:fade={{ duration: 200 }}
	placeholder={$translate('header.search')}
/>

<style>
	input {
		padding: 0 2rem;
		width: calc(100% - var(--size-header-button-width));
		border: 0;
		border-bottom: 2px solid var(--color-black);
		background: transparent;
		font: var(--font-weight-regular) 2.4rem / 1 var(--font-primary);
		text-transform: uppercase;
		color: var(--color-white);
	}

	input:focus {
		outline: none;
	}

	@media (min-width: 768px) {
		input {
			font-size: 3rem;
		}
	}

	@media (min-width: 1200px) {
		input {
			margin: 3rem 0;
			border-bottom-color: var(--color-white);
		}
	}
</style>
