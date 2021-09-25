<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';
	import Grid from '$lib/dashboard/elements/grid.svelte'

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched } = formData;
	let name = 'badge';
	let id = `${formName}-${name}`;
</script>

<Grid>
	<Label {id} isRequired>{$translate('dashboard.label.badge')}</Label>
	<TextInput
		errors={$errors.badge}
		{handleChange}
		{id}
		isTouched={$touched.badge}
		{name}
		bind:value={$form.badge}
	/>
</Grid>
