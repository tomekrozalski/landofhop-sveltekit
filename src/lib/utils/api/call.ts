export enum Endpoints {
	addBeverage = '/api/admin/beverages/add',
	addBeverageViewFromAbove = '/api/admin/beverages/photos/addViewFromAbove',
	addBeverageCover = '/api/admin/beverages/photos/addCover',
	addBeverageGallery = '/api/admin/beverages/photos/addGallery',
	addIngredient = '/api/admin/ingredients',
	addInstitution = '/api/admin/institutions',
	addPlace = '/api/admin/places',
	addStyle = '/api/admin/styles',
	advancedSearch = '/api/search/advanced',
	beverageAdminNotes = '/api/admin/beverages/notes',
	beverageBasics = '/api/basics/list',
	beverageDetails = '/api/beverages/details',
	beverageDetailsAdmin = '/api/admin/beverages/details',
	beveragePhotos = '/api/admin/beverages/photos',
	beverageRemove = '/api/admin/beverages/remove',
	beverageTotal = '/api/basics/total',
	ingredients = '/api/ingredients',
	institutionDetails = '/api/brands',
	institutions = '/api/institutions',
	logIn = '/api/user/login',
	logOut = '/api/user/logout',
	places = '/api/places',
	removeBeverageViewFromAbove = '/api/admin/beverages/photos/removeViewFromAbove',
	searchByPhrase = '/api/search/byPhrase',
	statsGeneral = '/api/stats/general',
	statsIngredients = '/api/stats/ingredients',
	statsStyles = '/api/stats/styles',
	styles = '/api/styles',
	translate = '/api/admin/translate',
	updateBasics = '/api/admin/basics/update',
	updateBeverage = '/api/admin/beverages/update',
	updateIngredient = '/api/admin/ingredients',
	updateRatings = '/api/admin/beverages/updateRatings',
	updateStyle = '/api/admin/styles'
}

type Props = {
	body?: string | FormData;
	formData?: boolean;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	pathParams?: (string | number)[];
};

export function getLink(endpoint: Endpoints, pathParams?: (string | number)[]) {
	return pathParams?.length ? `${endpoint}/${pathParams.join('/')}` : endpoint;
}

export default function call(fetch, endpoint: Endpoints, props?: Props) {
	const { formData = false, method = 'GET', pathParams, ...rest } = props || {};

	return fetch(getLink(endpoint, pathParams), {
		method,
		headers: {
			...(!formData && { 'Content-Type': 'application/json' })
		},
		...rest
	}).then((response) => {
		if (response.status >= 300) {
			throw new Error(response.statusText);
		}

		return response.json();
	});
}
