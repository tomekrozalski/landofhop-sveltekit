<script lang="ts">
	export let modal: boolean = false;
</script>

<div class:modal>
	<slot />
</div>

<style>
	div {
		display: flex;
		justify-content: flex-end;

		width: 100%;
	}

	div :global(button) {
		margin-left: 1rem;
	}

	.modal {
		display: flex;
		justify-content: space-between;
		margin: 0;
		padding: 2rem calc(var(--size-input-height) + var(--size-input-height) + 2rem) 0 0;
		width: 100%;
	}

	@media (min-width: 1024px) {
		div {
			margin: 4rem 0 0 46rem;
			width: 45rem;
		}
	}
</style>
