<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { type, material, color, value, unit } = details.container;
</script>

<dt>
	{$translate('beverage.testimonial.container')}
</dt>
<dd>
	<em class="label">
		{$translate(`beverage.testimonial.container.type.${type}`)}
		{$translate(`beverage.testimonial.container.material.${material}`)}
		{$translate(`beverage.testimonial.container.color.${color}`)}
		{$translate('beverage.testimonial.container.value', { value, unit })}
	</em>
</dd>
