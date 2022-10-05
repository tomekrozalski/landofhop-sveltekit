<script lang="ts">
	import { translate } from 'svelte-intl';
	import { isArray, isString } from 'lodash-es';
	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { updateInstitutionList } from '$lib/utils/helpers/updateStoreData';
	import { institutionStore } from '$lib/utils/stores/selects';
	import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
	import type { Select as SelectType } from '$lib/utils/types/common/Select.d';
	import Loading from './elements/Loading.svelte';
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let id: string | null = null;
	export let isDisabled: boolean = false;
	export let isMulti: boolean = false;
	export let setValue: (event: any) => void;
	export let withUnknown: boolean = false;
	export let value: string | string[] | null;

	function getSelectValue(value: any) {
		if (isArray(value)) {
			return value.map((id) => items.find((item) => item.value === id)) as SelectType[];
		}

		if (isString(value)) {
			return items.find((item) => item.value === value) as SelectType;
		}

		return null;
	}

	let items: SelectType[] = [];
	let groupBy: (item: { group: string }) => string | undefined;
	let getGroupHeaderLabel: (option: { label: string }) => string | undefined;

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

		groupBy = (item: { group: string }) => item.group;

		getGroupHeaderLabel = (option: { label: string }) => {
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

{#if value !== null && !items.length}
	<Loading />
{:else}
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
{/if}
