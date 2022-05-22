<script context="module" lang="ts">
	export async function load({ session }: { session: { isLoggedIn: boolean } }) {
		return {
			props: { session }
		};
	}
</script>

<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { locale, translations } from 'svelte-intl';
	import globalDictionary from '$lib/utils/dictionary/global.json';
	import topbarDictionary from '$lib/utils/dictionary/header/topbar.json';
	import navigation from '$lib/utils/stores/navigation';
	import '$lib/utils/styles/app.postcss';
	import '$lib/utils/styles/fonts.css';
	import '$lib/utils/styles/variables.css';
	import '$lib/utils/styles/global.css';
	import Topbar from '$lib/components/topbar/topbar.svelte';
	import Main from '$lib/components/main.svelte';

	translations.update(globalDictionary);
	translations.update(topbarDictionary);
	locale.set('pl');

	afterNavigate(() => {
		// when path change, close navigation
		navigation.close();
	});

	$: $navigation.isLoading = !!$navigating;
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
	<meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
	<link rel="manifest" href="/manifest.json" />
	<meta name="msapplication-TileColor" content="#ffffff" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<Topbar />
<Main>
	<slot />
</Main>
