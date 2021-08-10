<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import FormattedList from '$lib/elements/formattedList.svelte';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';

	export let details: Details;
	const { style } = details;
</script>

{#if style}
	<dt>
		{$translate('beverage.testimonial.style')}
	</dt>
	<dd>
		{#if style.label}
			<span>
				<FormattedList mode="narrow" let:item data={style.label}>
					<MarkLanguage label tag="em" name={item} />
				</FormattedList>
			</span>
		{/if}
		{#if style.producer}
			<span>
				<FormattedList mode="narrow" let:item data={style.producer}>
					<MarkLanguage producer tag="em" name={item} />
				</FormattedList>
			</span>
		{/if}
		{#if style.editorial}
			<span>
				<FormattedList mode="narrow" let:item data={style.editorial}>
					<MarkLanguage editorial tag="em" name={item} />
				</FormattedList>
			</span>
		{/if}
	</dd>
{/if}
