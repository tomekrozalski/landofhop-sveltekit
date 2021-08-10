<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
</script>

<dt>
	{$translate('beverage.testimonial.container')}
</dt>
<dd>
	<em class="label">
		{$translate(`beverage.testimonial.container.type.${$beverage.container.type}`)}
		{$translate(`beverage.testimonial.container.material.${$beverage.container.material}`)}
		{$translate(`beverage.testimonial.container.color.${$beverage.container.color}`)}
		{$translate('beverage.testimonial.container.value', {
			value: $beverage.container.value,
			unit: $beverage.container.unit
		})}
	</em>
</dd>
