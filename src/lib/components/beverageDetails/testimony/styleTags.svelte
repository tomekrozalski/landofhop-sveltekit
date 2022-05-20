<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import FormattedList from '$lib/elements/formattedList.svelte';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';

	export let details: Details;
	const { styleTags } = details;
</script>

{#if styleTags}
	<dt>
		{$translate('beverage.testimonial.styleTags')}
	</dt>
	<dd>
		<span>
			<FormattedList mode="narrow" let:item data={styleTags.editorial}>
				<MarkLanguage
					editorial
					tag="a"
					target="/advanced-search?styleTags={item.badge}"
					name={item.name}
				/>
			</FormattedList>
		</span>
	</dd>
{/if}
