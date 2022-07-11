<script lang="ts">
	export let editorial: boolean = false;
	export let label: boolean = false;
	export let name: {
		language: string;
		value: string;
	};
	export let producer: boolean = false;
	export let tag: string;
</script>

<svelte:element
	class:editorial
	class:label
	class:producer
	lang={name.language !== 'pl' ? name.language : null}
	this={tag}
	{...$$restProps}
>
	{name.value}
</svelte:element>
