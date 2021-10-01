<script>
	import ModalWrapper from './modalWrapper.svelte';

	let isModalOpen = false;
</script>

<button type="button" on:click={() => (isModalOpen = true)}>dodaj</button>

{#if isModalOpen}
	<ModalWrapper>abc</ModalWrapper>
{/if}

<style>
	button {
		grid-column: span 2;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: var(--size-input-height);
		background-color: var(--color-grey-4);
		font-size: 1.5rem;
		color: var(--color-grey-2);
		transition: color var(--transition-default), background-color var(--transition-default);
	}

	button:hover {
		background-color: var(--color-black);
		color: var(--color-grey-3);
	}
</style>
