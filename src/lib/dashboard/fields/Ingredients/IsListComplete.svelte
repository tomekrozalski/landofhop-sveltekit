<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import Toggle from '$lib/elements/form/Toggle.svelte';

	export let fieldName: string;
	export let formName: string;
	export let updateField: () => void;
	export let value: boolean;

	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.ingredientsComplete')}</Label>
<Toggle {fieldName} {id} {updateField} {value} />
