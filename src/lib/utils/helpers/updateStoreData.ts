import { get } from 'svelte/store';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import { styleStore } from '$lib/dashboard/utils/stores';
import type { Style as StyleType } from '$lib/utils/types/Style';

async function updateStyleList() {
	if (get(styleStore).length === 0) {
		const styles: StyleType[] = await apiCall(fetch, Endpoints.styles);
		styleStore.set(styles);
	}
}

export { updateStyleList };
