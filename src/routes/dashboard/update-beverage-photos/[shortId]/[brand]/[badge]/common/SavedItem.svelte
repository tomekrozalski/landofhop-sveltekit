<script lang="ts">
	export let isViewFromAbove: boolean = false;
</script>

<div class:isViewFromAbove>
	<slot />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		width: 26.4rem;
		max-height: 54rem;
		overflow: hidden;
		border: 0.2rem solid var(--color-grey-3);
		padding: 2rem;
		line-height: 0;
		cursor: no-drop;
		position: relative;
	}

	div.isViewFromAbove {
		align-items: center;
	}

	div :global(img) {
		width: 100%;
	}
</style>
