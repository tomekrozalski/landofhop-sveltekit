<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';
	import FormattedList from '$lib/elements/formattedList.svelte';
</script>

<header>
	<MarkLanguage tag="h1" name={$beverage.name} />
	<p>
		{$translate('beverage.header.brewed')}
		<!-- remark -->
		{#if $beverage.remark?.label}
			<MarkLanguage label tag="em" name={$beverage.remark.label} />
		{/if}
		{#if $beverage.remark?.producer}
			<MarkLanguage tag="em" name={$beverage.remark.producer} />
		{/if}
		<!-- contract -->
		{#if $beverage.contract}
			{$translate('beverage.header.by')}
			{#if $beverage.contract.label}
				<MarkLanguage label tag="span" name={$beverage.contract.label} />
			{/if}
			{#if $beverage.contract.producer}
				<MarkLanguage producer tag="span" name={$beverage.contract.producer} />
			{/if}
			{#if $beverage.contract.editorial}
				<MarkLanguage editorial tag="span" name={$beverage.contract.editorial} />
			{/if}
		{/if}
		<!-- cooperation -->
		{#if $beverage.cooperation}
			{$translate('beverage.header.inCooperationWith')}
			{#if $beverage.cooperation.label?.length}
				<FormattedList mode="short" let:item data={$beverage.cooperation.label}>
					<MarkLanguage label tag="span" name={item} />
				</FormattedList>
			{/if}
			{#if $beverage.cooperation.producer?.length}
				<FormattedList mode="short" let:item data={$beverage.cooperation.producer}>
					<MarkLanguage producer tag="span" name={item} />
				</FormattedList>
			{/if}
			{#if $beverage.cooperation.editorial?.length}
				<FormattedList mode="short" let:item data={$beverage.cooperation.editorial}>
					<MarkLanguage editorial tag="span" name={item} />
				</FormattedList>
			{/if}
		{/if}
		<!-- brand -->
		{#if $beverage.contract || $beverage.isContract}
			{$translate('beverage.header.for')}
		{:else}
			{$translate('beverage.header.by')}
		{/if}
		<MarkLanguage
			label
			tag="em"
			name={$beverage.brand.name}
		/><!--
			series (without space)
		-->{#if $beverage.series}
			{$translate('beverage.header.series')}
			{#if $beverage.series.label?.length}
				<FormattedList mode="narrow" let:item data={$beverage.series.label}>
					<MarkLanguage label tag="span" name={item} />
				</FormattedList>
			{/if}
			{#if $beverage.series.producer?.length}
				<FormattedList mode="narrow" let:item data={$beverage.series.producer}>
					<MarkLanguage producer tag="span" name={item} />
				</FormattedList>
			{/if}
		{/if}
	</p>
</header>

<style>
	header {
		grid-area: header;
		margin-top: 1rem;
	}
</style>
