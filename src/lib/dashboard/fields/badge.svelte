<script lang="ts">
	import { translate } from 'svelte-intl';

	import Grid from '$lib/dashboard/elements/grid.svelte';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';

	export let form: 'label' | 'producer';
	let fieldName = 'badge';
	let id = `${form}-${fieldName}`;
	let value = '';
</script>

<Grid>
	<Label {id} isRequired>{$translate('dashboard.label.badge')}</Label>
	<!-- <TextInput {id} {fieldName} bind:value /> -->
</Grid>

{value}
