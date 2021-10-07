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
		margin: 4rem 0 0 46rem;
		width: 45rem;
	}

	.modal {
		margin: 0;
		padding: 2rem calc(var(--size-input-height) + 1rem) 0 0;
		width: 100%;
	}
</style>
