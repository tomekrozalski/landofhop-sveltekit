import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';
import authentication from '$lib/utils/stores/authentication';
import { AppLanguage } from '$types/enums/Globals.enum';
import { getAdminData, getDetails, getListPage, getNext, getPrevious } from './utils/load';
import detailsNormalizer from './utils/load/getDetails/normalizer';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const badge = params.badge;
	const shortId = params.shortId;

	if (!badge || !shortId) {
		throw error(404, 'Incorrect params');
	}

	const beverage = await getDetails({ shortId });
	const formattedDetails = detailsNormalizer(beverage, AppLanguage.pl);

	return {
		listPage: getListPage({ added: beverage.added }),
		previous: getPrevious({ added: beverage.added }),
		details: formattedDetails,
		next: getNext({ added: beverage.added }),
		streamed: {
			...(get(authentication).isLoggedIn && { adminData: getAdminData({ badge, shortId }) })
		}
	};
};
