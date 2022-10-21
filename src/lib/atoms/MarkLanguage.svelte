<script lang="ts">
	import type { LanguageValue } from '$types/LanguageValue.d';

	export let editorial: boolean = false;
	export let label: boolean = false;
	export let name: LanguageValue;
	export let producer: boolean = false;
	export let tag: string;
</script>

<svelte:element
	this={tag}
	class:editorial
	class:label
	class:producer
	lang={name.language && name.language !== 'pl' ? name.language : null}
	{...$$restProps}
>
	{name.value}
</svelte:element>
