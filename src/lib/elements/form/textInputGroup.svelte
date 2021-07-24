<script lang="ts">
	import Label from './label.svelte';
	import TextInput from './textInput.svelte';

	export let fieldName: string, formStore: any;
</script>

<Label {fieldName} {formStore} />
<TextInput {fieldName} {formStore} />
