<script lang="ts">
	import { fade } from 'svelte/transition';
	import { translate } from 'svelte-intl';
	import navigation from '$lib/utils/stores/navigation';
	import setSearchParam from '$lib/utils/helpers/setSearchParam';

	function focusOnMount(input) {
		input.focus();
	}
</script>

<input
	on:input={(e) => setSearchParam(e.currentTarget.value)}
	type="text"
	use:focusOnMount
	bind:value={$navigation.searchPhrase}
	transition:fade={{ duration: 200 }}
	placeholder={$translate('header.search')}
/>

<style>
	input {
		margin: 3rem 0;
		width: calc(100% - var(--size-header-button-width));
		border: 0;
		border-bottom: 2px solid var(--color-white);
		background: transparent;
		font: var(--font-weight-regular) 3rem / 1 var(--font-primary);
		color: var(--color-white);
	}

	input:focus {
		outline: none;
	}
</style>
