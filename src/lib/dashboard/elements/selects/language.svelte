<script lang="ts">
	import Select from 'svelte-select';

	export let name: string;
	export let updateField: (string, any) => void;
	export let value: { value: string; label: string };

	let items = [
		{ value: 'pl', label: 'polski' },
		{ value: 'en', label: 'angielski' }
	];
</script>

<div>
	<Select
		containerClasses="select"
		{items}
		{value}
		on:select={(event) => updateField(name, event.detail)}
	/>
</div>

<style>
	div {
		--height: var(--size-input-height);
	}

	div :global(.select) {
		color: red;
	}
</style>
