<script lang="ts">
	export let geoCoordinates: [number, number] | null;
	export let data: { size: number; stroke: number };
	export let type: 'cooperation' | 'contract' | 'beverages' | 'point';

	const [latitude, longitude] = geoCoordinates || [0, 0];
	const { size, stroke } = data;
</script>

{#if type === 'point'}
	<circle class="point" cx={latitude} cy={longitude} r="1" />
{:else if stroke}
	<circle class={type} cx={latitude} cy={longitude} r={size - stroke / 2} stroke-width={stroke} />
{/if}

<style>
	circle {
		fill: none;
		opacity: 0.5;
	}

	circle.cooperation {
		stroke: var(--color-brand-10);
	}

	circle.contract {
		stroke: var(--color-brand-8);
	}

	circle.beverages {
		stroke: var(--color-brand-5);
	}

	circle.point {
		fill: var(--color-black);
	}
</style>
