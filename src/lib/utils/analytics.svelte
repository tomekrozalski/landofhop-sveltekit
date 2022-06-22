<script lang="ts">
	import Partytown from 'partytown-sveltekit/Partytown.svelte';
	import { page } from '$app/stores';

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', 'G-BH592T585W', {
				page_title: document.title,
				page_path: $page.url.href
			});
		}
	}
</script>

<svelte:head>
	<script>
		partytown = {
			forward: ['dataLayer.push']
		};
	</script>
	<Partytown script="https://www.googletagmanager.com/gtag/js?id=G-BH592T585W" />
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-BH592T585W');
	</script>
</svelte:head>
