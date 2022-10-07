<script lang="ts">
	import { institutionStore } from '$lib/utils/stores/selects';
	import { translate } from 'svelte-intl';
	import type { InstitutionEssence } from '$lib/utils/types/Institution';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import SearchLink from '$lib/atoms/forms/SearchLink.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';

	export let badge: string;
	export let brandId: string;
	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, updateTouched, validateField } = formData;
	let fieldName = 'rateBeer';
	let id = `${formName}-${fieldName}`;

	function getRateBeerSearchLink() {
		const params = new URLSearchParams();

		const brand = $institutionStore.find(
			({ shortId }) => shortId === brandId
		) as InstitutionEssence;
		const formattedBrand = brand.badge.replaceAll('-', ' ').replaceAll('browar ', '');
		const name = badge.replaceAll('-', ' ');

		params.set('q', [formattedBrand, name].join(' '));
		params.set('tab', 'beer');

		return `https://www.ratebeer.com/search?${params}`;
	}
</script>

<Label {id}>{$translate('dashboard.label.rateBeer')}</Label>
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
<SearchLink to={getRateBeerSearchLink()} />
