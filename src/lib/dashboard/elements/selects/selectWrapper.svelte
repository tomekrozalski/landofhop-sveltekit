<script lang="ts">
	import Select from 'svelte-select';
	import isArray from 'lodash/isArray';
	import isEmpty from 'lodash/isEmpty';
	import Error from '$lib/elements/form/error.svelte';

	type SelectType = { value: string; label: string };
	export let errors: string | string[];
	export let handleClear: () => void;
	export let id: string = null;
	export let isDisabled: boolean = false;
	export let isMulti: boolean = false;
	export let isWide: boolean = false;
	export let items: SelectType[];
	export let setValue: (event: any) => void;
	export let style: string = '';
	export let value: SelectType | SelectType[] | null;

	$: formattedErrors = isArray(errors) ? errors.filter(Boolean).join(', ') : errors;
</script>

<div class:isWide {style}>
	<Select
		on:clear={handleClear}
		containerClasses="select"
		{id}
		isDisabled={isDisabled || value === null}
		{isMulti}
		{items}
		on:select={setValue}
		showChevron={true}
		value={isEmpty(value) ? '' : value}
		{...$$restProps}
	/>
	{#if formattedErrors}
		<Error>{formattedErrors}</Error>
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
		--inputColor: var(--color-black);
		--selectedItemPadding: 0;
		--listBorderRadius: 0;
		--itemFirstBorderRadius: 0;
		--itemIsActiveBG: var(--color-black);
		--itemHoverBG: var(--color-grey-4);
		--itemPadding: 0 1rem;

		/* clear selector */
		--clearSelectTop: 0.5rem;
		--clearSelectRight: 0.8rem;
		--clearSelectBottom: none;
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
		/* multiselect */
		--multiSelectPadding: 0 1rem;
		--multiItemMargin: 0.4rem 0.8rem 0 0;
		--multiItemBorderRadius: 0;
		--multiItemPadding: 0 0 0 1rem;
		--multiItemHeight: calc(var(--size-input-height) - 0.8rem);
		--multiItemBG: var(--color-brand-10-light);
		--multiClearBG: var(--color-brand-10-light);
		--multiItemActiveBG: var(--color-brand-10-light);
		--multiItemActiveColor: var(--color-black);
		--multiClearHoverFill: var(--color-white);
		--multiClearHoverBG: var(--color-black);
		--multiClearRadius: 0;
		--multiClearTop: 0;
		--multiClearHeight: 100%;
		--multiClearWidth: 2rem;
		--multiClearPadding: 0.4rem 0.2rem 0.2rem 0.2rem;

		position: relative;
	}

	div.isWide {
		grid-column: 2 / 3;
	}

	div :global(.selectContainer.disabled) {
		--indicatorColor: var(--color-grey-5);
	}

	div :global(.selectContainer.select) {
		border-bottom: 1px solid var(--color-grey-2);
	}

	div :global(.selectContainer.select .indicator),
	div :global(.selectContainer.select .item),
	div :global(.selectContainer.select .clearSelect),
	div :global(.selectContainer.select .multiSelectItem_clear) {
		cursor: pointer;
	}

	div :global(.selectContainer.select .multiSelectItem) {
		cursor: text;
	}

	div :global(.selectContainer.select .multiSelectItem_label) {
		font-size: 1.5rem;
	}

	div :global(.selectContainer.select .multiSelectItem .multiSelectItem_clear) {
		transition: background-color var(--transition-default);
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

	div :global(.selectContainer.select .listGroupTitle:not(:first-of-type)) {
		margin-top: 1rem;
	}
</style>
