<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import FormattedList from '$lib/atoms/FormattedList.svelte';

	$: ({ brand, contract, cooperation, isContract, name, remark, series } = $page.data.details);
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
			<MarkLanguage producer tag="em" name={remark.producer} />
		{/if}
		{#if remark?.editorial}
			<MarkLanguage editorial tag="em" name={remark.editorial} />
		{/if}
		<!-- contract -->
		{#if contract}
			{$translate('beverage.header.by')}
			{#if contract.label}
				<MarkLanguage label tag="span" name={contract.label.name} />
			{/if}
			{#if contract.producer}
				<MarkLanguage producer tag="span" name={contract.producer.name} />
			{/if}
			{#if contract.editorial}
				<MarkLanguage editorial tag="span" name={contract.editorial.name} />
			{/if}
		{/if}
		<!-- cooperation -->
		{#if cooperation}
			{$translate('beverage.header.inCooperationWith')}
			{#if cooperation.label?.length}
				<FormattedList mode="short" let:item data={cooperation.label}>
					<MarkLanguage label tag="span" name={item.name} />
				</FormattedList>
			{/if}
			{#if cooperation.producer?.length}
				<FormattedList mode="short" let:item data={cooperation.producer}>
					<MarkLanguage producer tag="span" name={item.name} />
				</FormattedList>
			{/if}
			{#if cooperation.editorial?.length}
				<FormattedList mode="short" let:item data={cooperation.editorial}>
					<MarkLanguage editorial tag="span" name={item.name} />
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
			{#if series.editorial?.length}
				<FormattedList mode="narrow" let:item data={series.editorial}>
					<MarkLanguage editorial tag="span" name={item} />
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
