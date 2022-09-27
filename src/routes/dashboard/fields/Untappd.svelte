<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';
	import { institutionStore } from '$lib/utils/stores/selects';

	import { labelStore } from '../Beverage/utils/stores';
	import SearchLink from '../elements/SearchLink.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, updateTouched, validateField } = formData;
	let fieldName = 'untappd';
	let id = `${formName}-${fieldName}`;

	function getUntappdSearchLink() {
		const params = new URLSearchParams();

		const brand = $institutionStore
			.find(({ shortId }) => shortId === $labelStore.brand)
			.badge.replaceAll('-', ' ')
			.replaceAll('browar ', '');
		const name = $labelStore.badge.replaceAll('-', ' ');

		params.set('q', [brand, name].join('+'));

		return `https://untappd.com/search?${params}`;
	}
</script>

<Label {id}>{$translate('dashboard.label.untappd')}</Label>
<Conditional
	{fieldName}
	{id}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<TextInput
	errors={$errors[fieldName]}
	{handleChange}
	{id}
	isTouched={$touched[fieldName]}
	{fieldName}
	bind:value={$form[fieldName]}
/>
<SearchLink to={getUntappdSearchLink()} />
