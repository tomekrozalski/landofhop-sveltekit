<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/atoms/forms/Label.svelte';
	import Toggle from '$lib/atoms/forms/Toggle.svelte';

	export let fieldName: string;
	export let formName: string;
	export let updateField: () => void;
	export let value: boolean;

	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.ingredientsComplete')}</Label>
<Toggle {fieldName} {id} {updateField} {value} />
