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
		margin: 2rem 0 0 23rem;
		width: 35rem;
	}
</style>
