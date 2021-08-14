<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';
	import FormattedList from '$lib/elements/formattedList.svelte';

	export let details: Details;
	const { brand, contract, cooperation, isContract, name, remark, series } = details;
</script>

<header>
	<MarkLanguage tag="h1" {name} />
	<p>
		{$translate('beverage.header.brewed')}
		<!-- remark -->
		{#if remark?.label}
			<MarkLanguage label tag="em" name={remark.label} />
		{/if}
		{#if remark?.producer}
			<MarkLanguage tag="em" name={remark.producer} />
		{/if}
		<!-- contract -->
		{#if contract}
			{$translate('beverage.header.by')}
			{#if contract.label}
				<MarkLanguage label tag="span" name={contract.label} />
			{/if}
			{#if contract.producer}
				<MarkLanguage producer tag="span" name={contract.producer} />
			{/if}
			{#if contract.editorial}
				<MarkLanguage editorial tag="span" name={contract.editorial} />
			{/if}
		{/if}
		<!-- cooperation -->
		{#if cooperation}
			{$translate('beverage.header.inCooperationWith')}
			{#if cooperation.label?.length}
				<FormattedList mode="short" let:item data={cooperation.label}>
					<MarkLanguage label tag="span" name={item} />
				</FormattedList>
			{/if}
			{#if cooperation.producer?.length}
				<FormattedList mode="short" let:item data={cooperation.producer}>
					<MarkLanguage producer tag="span" name={item} />
				</FormattedList>
			{/if}
			{#if cooperation.editorial?.length}
				<FormattedList mode="short" let:item data={cooperation.editorial}>
					<MarkLanguage editorial tag="span" name={item} />
				</FormattedList>
			{/if}
		{/if}
		<!-- brand -->
		{#if contract || isContract}
			{$translate('beverage.header.for')}
		{:else}
			{$translate('beverage.header.by')}
		{/if}
		<MarkLanguage label tag="em" name={brand.name} />
		{#if series}
			{$translate('beverage.header.series')}
			{#if series.label?.length}
				<FormattedList mode="narrow" let:item data={series.label}>
					<MarkLanguage label tag="span" name={item} />
				</FormattedList>
			{/if}
			{#if series.producer?.length}
				<FormattedList mode="narrow" let:item data={series.producer}>
					<MarkLanguage producer tag="span" name={item} />
				</FormattedList>
			{/if}
		{/if}
	</p>
</header>

<style>
	header {
		margin-top: 1rem;
	}

	header :global(h1) {
		text-align: left;
	}
</style>
