<script>
	import { IngredientType } from '$lib/utils/enums/Beverage.enum';

	export let isActive = false;
	export let isFirst = false;
	export let isHover = false;
	export let isSelectable = false;
	export let getOptionLabel = undefined;
	export let item = undefined;
	export let filterText = '';

	let itemClasses = '';

	$: {
		const classes = [];

		if (isActive) {
			classes.push('active');
		}

		if (isFirst) {
			classes.push('first');
		}

		if (isHover) {
			classes.push('hover');
		}

		if (item.isGroupHeader) {
			classes.push('groupHeader');
		}

		if (item.isGroupItem) {
			classes.push('groupItem');
		}

		if (!isSelectable) {
			classes.push('notSelectable');
		}

		if (item.type) {
			classes.push('ingredient');
		}

		if (item.type === IngredientType.water) {
			classes.push('water');
		}

		if (item.type === IngredientType.malt) {
			classes.push('malt');
		}

		if (item.type === IngredientType.hop) {
			classes.push('hop');
		}

		if (item.type === IngredientType.yeast) {
			classes.push('yeast');
		}

		if (item.type === IngredientType.addition) {
			classes.push('addition');
		}

		itemClasses = classes.join(' ');
	}
</script>

<div class="item {itemClasses}">
	{@html getOptionLabel(item, filterText)}
</div>

<style>
	.item {
		cursor: default;
		height: var(--height, 42px);
		line-height: var(--height, 42px);
		padding: var(--itemPadding, 0 20px);
		color: var(--itemColor, inherit);
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.groupHeader {
		text-transform: var(--groupTitleTextTransform, uppercase);
	}

	.groupItem {
		padding-left: var(--groupItemPaddingLeft, 40px);
	}

	.item:active {
		background: var(--itemActiveBackground, #b9daff);
	}

	.item.active {
		background: var(--itemIsActiveBG, #007aff);
		color: var(--itemIsActiveColor, #fff);
	}

	.item.notSelectable {
		color: var(--itemIsNotSelectableColor, #999);
	}

	.item.first {
		border-radius: var(--itemFirstBorderRadius, 4px 4px 0 0);
	}

	.item.hover:not(.active) {
		background: var(--itemHoverBG, #e7f2ff);
		color: var(--itemHoverColor, inherit);
	}

	.item.ingredient {
		position: relative;
	}

	.item.ingredient::after {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		content: '';
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
	}

	.item.water::after {
		background-color: var(--color-ingredients-water);
	}

	.item.malt::after {
		background-color: var(--color-ingredients-malt);
	}

	.item.hop::after {
		background-color: var(--color-ingredients-hop);
	}

	.item.yeast::after {
		background-color: var(--color-ingredients-yeast);
	}

	.item.addition::after {
		background-color: var(--color-ingredients-addition);
	}
</style>
