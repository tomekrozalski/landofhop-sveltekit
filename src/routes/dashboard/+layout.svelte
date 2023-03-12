<script lang="ts">
	import { redirect } from '@sveltejs/kit';

	export let data;

	if (!data.authenticated) {
		throw redirect(303, '/');
	}
</script>

<slot />
