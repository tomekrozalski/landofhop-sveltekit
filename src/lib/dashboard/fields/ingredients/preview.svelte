<script lang="ts">
	export let ingredients: string[];

	$: filteredIngredients = ingredients.filter((value) => value.length);
</script>

{#if filteredIngredients.length}
	<ul>
		{#each filteredIngredients as ingredient}
			<li>{ingredient}</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		grid-column: 2/3;
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 2rem;
		border-bottom: 0.1rem dashed var(--color-grey-1);
		padding: 2rem 0;
	}

	li {
		font-weight: var(--font-weight-regular);
	}

	li::before {
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		content: '';
		margin-right: 0.6rem;
		background-color: var(--color-black);
		position: relative;
		bottom: 0.2rem;
	}

	li:not(:last-of-type)::after {
		content: ',';
		margin-right: 0.4rem;
	}
</style>
