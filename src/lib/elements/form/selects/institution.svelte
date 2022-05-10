<script lang="ts">
	import { translate } from 'svelte-intl';
	import { isArray, isString } from 'lodash-es';

	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { institutionStore } from '$lib/utils/stores/selects';
	import SelectWrapper from '$lib/elements/form/selects/selectWrapper.svelte';
	import { updateInstitutionList } from '$lib/utils/helpers/updateStoreData';
	import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let id: string = null;
	export let isDisabled: boolean = false;
	export let isMulti: boolean = false;
	export let setValue: (event: any) => void;
	export let withUnknown: boolean = false;
	export let value: string | string[] | null;

	function getSelectValue(value) {
		if (isArray(value)) {
			return value.map((id) => items.find((item) => item.value === id));
		}

		if (isString(value)) {
			return items.find((item) => item.value === value);
		}

		return null;
	}

	let items = [];
	let groupBy;
	let getGroupHeaderLabel;

	$: if (value !== null) {
		updateInstitutionList();
	}

	$: if (withUnknown) {
		items = $institutionStore
			.map(({ name, shortId }) => ({
				label: getFromArray(name, 'pl' as AppLanguage).value,
				value: shortId,
				group: 'brands'
			}))
			.sort((a, b) => (a.label < b.label ? -1 : 1));

		items.unshift({ label: $translate('form.institutions.unknownContract'), value: '--' });

		groupBy = (item) => item.group;

		getGroupHeaderLabel = (option) => {
			return $translate(`form.institutions.${option.label}`);
		};
	} else {
		items = $institutionStore
			.map(({ name, shortId }) => ({
				label: getFromArray(name, 'pl' as AppLanguage).value,
				value: shortId
			}))
			.sort((a, b) => (a.label < b.label ? -1 : 1));
	}
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{id}
	{isDisabled}
	{isMulti}
	{items}
	placeholder={$translate('form.select.placeholder.institution')}
	{setValue}
	value={getSelectValue(value)}
	{groupBy}
	{getGroupHeaderLabel}
/>
