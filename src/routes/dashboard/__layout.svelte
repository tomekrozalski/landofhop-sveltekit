<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session }) => {
		if (!session.isLoggedIn) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {
			status: 200
		};
	};
</script>

<slot />
