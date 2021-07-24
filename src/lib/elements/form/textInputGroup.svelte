<script lang="ts">
	import type { InputTypeTypes } from '$lib/utils/types/form';
	import Label from './label.svelte';
	import TextInput from './textInput.svelte';

	export let name: string,
		label: string,
		type: InputTypeTypes = 'text',
		isInverted: boolean = false,
		isRequired: boolean = false,
		value: string;
</script>

<Label {name} {isRequired}>{label}</Label>
<TextInput {name} {type} {isInverted} bind:value />
