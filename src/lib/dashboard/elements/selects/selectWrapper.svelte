<script lang="ts">
	import Select from 'svelte-select';
	import Error from '$lib/elements/form/error.svelte';

	type SelectType = { value: string; label: string };
	export let errors: string | string[];
	export let items: SelectType[];
	export let name: string;
	export let updateValidateField: (name: string, value: string) => void;
	export let value: SelectType | null;

	function handleClear() {
		updateValidateField(name, '');
	}
</script>

<div>
	<Select
		on:clear={handleClear}
		containerClasses="select"
		isDisabled={value === null}
		{items}
		on:select={(event) => updateValidateField(name, event.detail.value)}
		showChevron={true}
		{value}
		{...$$restProps}
	/>
	{#if errors.length}
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
		--inputPadding: 0 1rem;
		--selectedItemPadding: 0;
		--listBorderRadius: 0;
		--itemFirstBorderRadius: 0;
		--itemIsActiveBG: var(--color-black);
		--itemHoverBG: var(--color-grey-4);
		--itemPadding: 0 1rem;

		/* clear selector */
		--clearSelectTop: 0.6rem;
		--clearSelectRight: 0.8rem;
		--clearSelectBottom: 0;
		--clearSelectWidth: 1.6rem;
		--clearSelectColor: var(--color-grey-1);
		--clearSelectHoverColor: var(--color-black);
		/* indicator */
		--indicatorTop: 0.7rem;
		--indicatorRight: 0.6rem;
		--indicatorHeight: 2rem;
		--indicatorColor: var(--color-grey-1);
		/* group */
		--groupTitleColor: var(--color-grey-1);
		--groupTitleFontSize: 1.2rem;
		--groupTitleFontWeight: 500;
		--groupTitlePadding: 0 1rem;
		--groupItemPaddingLeft: 2rem;
		/* disabled */
		--disabledBackground: var(--color-grey-5);
		--disabledBorderColor: var(--color-grey-5);

		position: relative;
	}

	div :global(.selectContainer.disabled) {
		--indicatorColor: var(--color-grey-5);
	}

	div :global(.selectContainer.select) {
		border-bottom: 1px solid var(--color-grey-2);
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
		cursor: text;
	}

	div :global(.selectContainer.select.disabled input) {
		cursor: not-allowed;
	}

	div :global(.selectContainer.select .listContainer) {
		padding-bottom: 2rem;
	}

	div :global(.selectContainer.select .listGroupTitle:not(:first-of-type)) {
		margin-top: 1rem;
	}
</style>
