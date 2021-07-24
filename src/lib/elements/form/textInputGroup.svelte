<script lang="ts">
	import type { FieldTypes } from '$lib/utils/types/form';
	import Label from './label.svelte';
	import TextInput from './textInput.svelte';

	export let data: FieldTypes;
</script>

<Label {data} />
<TextInput bind:data />
