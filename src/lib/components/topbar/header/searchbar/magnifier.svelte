<script lang="ts">
	import { fade } from 'svelte/transition';
	import { translate } from 'svelte-intl';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 133.9 133.9"
	transition:fade={{ duration: 200 }}
>
	<title>{$translate('header.openSearch')}</title>
	<path
		fill="#fff"
		d="M132.4 125.1L99 92.2c9-10.2 14-23.1 14-36.6C113 25 87.7 0 56.5 0 25.4 0 0 25 0 55.6c0 30.7 25.4 55.6 56.5 55.6 12.6 0 24.9-4.2 34.9-11.9l33.6 33c1 1 2.3 1.5 3.7 1.5 1.4 0 2.7-0.5 3.7-1.5 1-1 1.6-2.3 1.6-3.7C133.9 127.3 133.4 126 132.4 125.1zM56.5 100.8c-25.4 0-46-20.3-46-45.2 0-24.9 20.6-45.2 46-45.2 25.3 0 46 20.3 46 45.2C102.5 80.6 81.9 100.8 56.5 100.8z"
	/>
</svg>
