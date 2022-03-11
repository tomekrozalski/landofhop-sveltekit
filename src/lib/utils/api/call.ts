export enum Endpoints {
	// addBeverage = 'admin/beverage',
	// addBeverageCap = 'admin/beverage/cap',
	// addBeverageCover = 'admin/beverage/cover',
	// addBeverageGallery = 'admin/beverage/gallery',
	// addIngredient = 'admin/ingredient',
	// addInstitution = 'admin/institution',
	// addPlace = 'admin/place',
	// addStyle = 'admin/style',
	beverageAdminNotes = '/api/admin/beverages/notes',
	beverageBasics = '/api/basics/list',
	beverageDetails = '/api/beverages/details',
	beverageDetailsAdmin = '/api/admin/beverages/details',
	// beveragePhotos = 'admin/beverage/photos',
	// beverageRemove = 'admin/beverage',
	// beverageSearch = 'beverage/search',
	beverageTotal = '/api/basics/total',
	ingredients = '/api/admin/ingredients',
	institutions = '/api/admin/institutions',
	logIn = '/api/user/login',
	logOut = '/api/user/logout',
	places = '/api/admin/places',
	// removeBeverageCap = 'admin/beverage/cap',
	statsGeneral = '/api/stats/general',
	statsStyles = '/api/stats/styles',
	styles = '/api/admin/styles'
	// unauthorize = 'unauthorize',
	// updateBeverage = 'admin/beverage',
	// updateStyle = 'admin/style'
}

type Props = {
	body?: string | FormData;
	formData?: boolean;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	pathParams?: (string | number)[];
};

function call(fetch, endpoint: Endpoints, props?: Props) {
	const { formData = false, method = 'GET', pathParams, ...rest } = props || {};
	const completeUrl = pathParams?.length ? `${endpoint}/${pathParams.join('/')}` : endpoint;

	return fetch(completeUrl, {
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

export default call;
