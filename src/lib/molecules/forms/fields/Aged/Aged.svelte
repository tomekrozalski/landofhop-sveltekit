<script lang="ts">
	import { translate } from 'svelte-intl';
	import { emptyAged } from '$lib/utils/helpers/emptyFieldValues';
	import AddButton from '$lib/atoms/forms/AddButton.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import RemoveButton from '$lib/atoms/forms/RemoveButton.svelte';
	import Plug from '$lib/atoms/forms/Plug.svelte';
	import PreviousContent from '../PreviousContent.svelte';
	import Time from './Time.svelte';
	import Type from './Type.svelte';
	import Wood from './Wood.svelte';
	import Wrapper from './ItemWrapper.svelte';

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
