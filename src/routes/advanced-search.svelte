<script lang="ts">
	import { onMount } from 'svelte';
	// import { translate } from 'svelte-intl';

	import navigation from '$lib/utils/stores/navigation';

	onMount(navigation.closeSearchBar);
</script>

<div>Advanced</div>
