<script lang="ts">
	import Select from 'svelte-select';
	import Error from '$lib/elements/form/error.svelte';

	type SelectType = { value: string; label: string };
	export let errors: string;
	export let items: SelectType[];
	export let name: string;
	export let updateValidateField: (name: string, value: string) => void;
	export let value: SelectType;

	$: console.log('errors', errors);
	$: console.log('errors', errors);

	function handleClear() {
		console.log('handleClear!');
		updateValidateField(name, '');
	}
</script>

<div>
	<Select
		on:clear={handleClear}
		containerClasses="select"
		{items}
		on:select={(event) => updateValidateField(name, event.detail.value)}
		{value}
		{...$$restProps}
	/>
	{#if errors}
		<Error>{errors}</Error>
	{/if}
</div>

<style>
	div {
		--border: 0;
		--borderRadius: 0;
		--borderHoverColor: var(--color-grey-2);
		--borderFocusColor: var(--color-black);
		--padding: 0 1rem;
		--background: var(--color-grey-4);
		--height: var(--size-input-height);
		--inputPadding: 0 3.5rem 0 4rem;
		--selectedItemPadding: 0 1rem;
		--clearSelectTop: 0.3rem;
		--clearSelectRight: 0.8rem;
		--clearSelectBottom: 0;
		--clearSelectWidth: 1.6rem;
		--listBorderRadius: 0;
		--itemFirstBorderRadius: 0;
		--itemIsActiveBG: var(--color-black);
		--itemHoverBG: var(--color-grey-4);
		--itemPadding: 0 1rem;
		--clearSelectColor: var(--color-grey-1);
		--clearSelectHoverColor: var(--color-black);
		/* indicator */
		--indicatorTop: 0.7rem;
		--indicatorRight: 0.6rem;
		--indicatorColor: var(--color-grey-1);
		/* group */
		--groupTitleColor: var(--color-grey-1);
		--groupTitleFontSize: 1.2rem;
		--groupTitleFontWeight: 500;
		--groupTitlePadding: 0 1rem;
		--groupItemPaddingLeft: 2rem;

		position: relative;
	}

	div :global(.selectContainer.select) {
		border-bottom: 1px solid var(--color-grey-2);
	}

	div :global(.selectContainer.select svg) {
		fill: var(--color-grey-1);
	}

	div :global(.selectContainer.select .indicator),
	div :global(.selectContainer.select .item),
	div :global(.selectContainer.select .clearSelect) {
		cursor: pointer;
	}

	div :global(.selectContainer.select .clearSelect) {
		transition: color var(--transition-default);
	}

	div :global(.selectContainer.select input) {
		font: var(--font-weight-light) 1.8rem / 1 var(--font-primary);
	}

	div :global(.selectContainer.select .listContainer) {
		padding-bottom: 2rem;
	}

	div :global(.selectContainer.select .listGroupTitle:not(:first-of-type)) {
		margin-top: 1rem;
	}
</style>
