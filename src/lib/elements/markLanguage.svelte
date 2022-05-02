<script lang="ts">
	export let editorial: boolean = false;
	export let label: boolean = false;
	export let name: {
		language: string;
		value: string;
	};
	export let producer: boolean = false;
	export let tag: string;
	export let target: string = '';
</script>

{#if target}
	<a
		class:editorial
		class:label
		class:producer
		href={target}
		lang={name.language !== 'pl' ? name.language : null}
	>
		{name.value}
	</a>
{:else}
	<svelte:element
		class:editorial
		class:label
		class:producer
		lang={name.language !== 'pl' ? name.language : null}
		this={tag}
	>
		{name.value}
	</svelte:element>
{/if}
