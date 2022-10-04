<script lang="ts">
	import { translate } from 'svelte-intl';
	import { AgedWood } from '$lib/utils/enums/Beverage.enum';
	import List from '../List.svelte';

	export let i: number;
	export let updateField: (fieldname: string, type: AgedWood) => void;
	export let value: AgedWood | null;
</script>

<List>
	{#each Object.values(AgedWood) as wood}
		<li>
			<input
				id="{wood}-{i}"
				name="wood-${i}"
				checked={value === wood}
				on:change={() => updateField(`aged[${i}].wood`, wood)}
				type="radio"
			/>
			<label for="{wood}-{i}">{$translate(`dashboard.aged.wood.${wood}`)}</label>
		</li>
	{/each}
</List>
