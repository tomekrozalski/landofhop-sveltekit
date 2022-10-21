<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/atoms/forms/Label.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import SearchLink from '$lib/atoms/forms/SearchLink.svelte';
	import { institutionStore } from '$lib/utils/stores/selects';
	import type { Institution } from '$lib/utils/stores/types/Institution.d';

	export let badge: string;
	export let brandId: string;
	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, updateTouched, validateField } = formData;
	let fieldName = 'untappd';
	let id = `${formName}-${fieldName}`;

	function getUntappdSearchLink() {
		const params = new URLSearchParams();

		const brand = $institutionStore.find(({ shortId }) => shortId === brandId) as Institution;
		const formattedBrand = brand.badge.replaceAll('-', ' ').replaceAll('browar ', '');
		const name = badge.replaceAll('-', ' ');

		params.set('q', [formattedBrand, name].join('+'));

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
