<script lang="ts">
	export let action: (e: Event) => void = () => {};
	export let active: boolean = false;
	export let current: boolean = false;
	export let label: string;
	export let tag: string;
</script>

<li>
	<svelte:element
		class="pagination-element"
		class:active
		class:inactive={!active}
		class:current
		on:click={action}
		this={tag}
		{...$$restProps}
	>
		{label}
	</svelte:element>
</li>

<style>
	li {
		width: 100%;
		margin: 1rem;
	}

	.pagination-element {
		display: block;
		padding: 1rem;
		border: 1px solid var(--color-grey-2);
		background-color: var(--color-grey-2);
		font-size: 1.6rem;
		line-height: 1;
		color: var(--color-white);
		text-align: center;
		cursor: pointer;
	}

	.pagination-element:hover:not(.inactive) {
		background-color: var(--color-white);
		color: var(--color-black);
	}

	.active {
		background-color: var(--color-grey-4);
		color: var(--color-grey-1);
		transition: background-color var(--transition-default), color var(--transition-default);
	}

	.inactive {
		cursor: not-allowed;
	}

	.current {
		background: var(--color-black);
		color: var(--color-white);
		border-color: var(--color-black);
	}

	@media (--sm) {
		li {
			width: auto;
			margin: 0.5rem;
		}

		.pagination-element {
			display: inline-block;
			padding: 0.8rem 1.5rem;
		}
	}

	@media (--lg) {
		.pagination-element {
			display: inline-block;
			padding: 0.5rem 1rem;
		}
	}
</style>
