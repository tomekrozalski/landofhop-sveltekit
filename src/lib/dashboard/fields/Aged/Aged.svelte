<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/2Label.svelte';
	import AddButton from '$lib/dashboard/elements/AddButton.svelte';
	import RemoveButton from '$lib/dashboard/elements/RemoveButton.svelte';
	import Plug from '$lib/dashboard/elements/Plug.svelte';
	import { emptyAged } from '$lib/dashboard/utils/emptyFieldValues';
	import PreviousContent from './previousContent.svelte';
	import Time from './time.svelte';
	import Type from './type.svelte';
	import Wood from './wood.svelte';
	import Wrapper from './itemWrapper.svelte';

	export let formName: string;
	export let formData: any;
	let { form, updateField } = formData;
	let fieldName = 'aged';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.aged')}</Label>
{#if $form[fieldName].length}
	{#each $form[fieldName] as _, i}
		<Wrapper {i}>
			<Type {i} {updateField} value={$form[fieldName][i].type} />
			<Wood {i} {updateField} value={$form[fieldName][i].wood} />
			<Time {formData} {i} />
			<PreviousContent {formData} {i} />
		</Wrapper>
		<RemoveButton {fieldName} {formData} {i} />
	{/each}
	<AddButton emptyValue={emptyAged} {fieldName} {formData} />
{:else}
	<Plug emptyValue={emptyAged} {fieldName} {formData} />
{/if}
