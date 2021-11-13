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

	// @ToDo: in a future it should be easier to code that with <svelte:element>
	//   For not it is not implemented yet
</script>

{#if tag === 'h1'}
	<h1
		class:editorial
		class:label
		class:producer
		lang={name.language !== 'pl' ? name.language : null}
	>
		{name.value}
	</h1>
{:else if tag === 'em'}
	<em
		class:editorial
		class:label
		class:producer
		lang={name.language !== 'pl' ? name.language : null}
	>
		{name.value}
	</em>
{:else if tag === 'span'}
	<span
		class:editorial
		class:label
		class:producer
		lang={name.language !== 'pl' ? name.language : null}
	>
		{name.value}
	</span>
{:else if tag === 'a'}
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
	<span>Something went wrong</span>
{/if}
