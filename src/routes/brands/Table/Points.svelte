<script lang="ts">
	export let value: number;
</script>

{#if value > 0}
	<span class="arrow-up" />
{:else if value === 0}
	<span class="circle" />
{:else}
	<span class="arrow-down" />
{/if}

{value}

<style>
	span {
		margin-right: 0.5rem;
	}

	.arrow-up,
	.arrow-down {
		width: 0;
		height: 0;
		border-left: 0.5rem solid transparent;
		border-right: 0.5rem solid transparent;
	}

	.arrow-up {
		border-bottom: 1rem solid var(--color-success);
	}

	.arrow-down {
		border-top: 1rem solid var(--color-danger);
	}

	.circle {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background-color: var(--color-warning);
	}
</style>
