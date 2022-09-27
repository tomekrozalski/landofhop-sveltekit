<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	if (!data.authenticated) {
		throw redirect(403, '/');
	}
</script>

<slot />
