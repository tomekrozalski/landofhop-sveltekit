<script lang="ts">
	import Header from './header/header.svelte';
	import Navigation from './navigation/navigation.svelte';

	let isNavigationOpened = false;
</script>

<Header bind:isNavigationOpened />
<Navigation bind:isNavigationOpened />
