<script lang="ts">
	export let geoCoordinates: [number, number] | null;
	const [latitude, longitude] = geoCoordinates || [0, 0];
</script>

<rect x={latitude - 1.5} y={longitude - 0.5} width="3" height="1" />
<rect x={latitude - 0.5} y={longitude - 1.5} width="1" height="3" />

<style>
	rect {
		fill: var(--color-black);
	}
</style>
