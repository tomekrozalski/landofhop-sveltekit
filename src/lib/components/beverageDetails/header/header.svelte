<script lang="ts">
	import { beverage } from '$lib/utils/stores/beverage';
</script>

<header>
	<h1 lang={$beverage.name.language !== 'pl' ? $beverage.name.language : null}>
		{$beverage.name.value}
	</h1>
	<p>
		Uwarzono
		<!--
      <Remark {details} />{' '}
      <Contract {details} />
      <Cooperation {details} />
      <Brand {details} />
      <Series {details} />
    -->
	</p>
</header>

<style>
	header {
		grid-area: header;
		margin-top: 1rem;
	}
</style>
