export enum Endpoints {
	// addBeverage = 'admin/beverage',
	// addBeverageCap = 'admin/beverage/cap',
	// addBeverageCover = 'admin/beverage/cover',
	// addBeverageGallery = 'admin/beverage/gallery',
	// addIngredient = 'admin/ingredient',
	// addInstitution = 'admin/institution',
	// addPlace = 'admin/place',
	// addStyle = 'admin/style',
	// authorize = 'authorize',
	// beverageAdminNotes = 'admin/beverage/notes',
	beverageBasics = '/api/basics/list',
	beverageDetails = '/api/beverages/details',
	// beverageDetailsAdmin = 'admin/details',
	// beveragePhotos = 'admin/beverage/photos',
	// beverageRemove = 'admin/beverage',
	// beverageSearch = 'beverage/search',
	beverageTotal = '/api/basics/total',
	// ingredients = 'admin/ingredient',
	// institutions = 'admin/institution',
	// places = 'admin/place',
	// removeBeverageCap = 'admin/beverage/cap',
	statsGeneral = '/api/stats/general',
	statsStyles = '/api/stats/styles',
	styles = '/api/styles'
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

	const isProtectedRoute = [
		// Endpoints.authorize,
		// Endpoints.beverageAdminNotes,
		// Endpoints.unauthorize,
		// Endpoints.institutions,
		// Endpoints.addInstitution,
		// Endpoints.addBeverage,
		// Endpoints.beveragePhotos,
		// Endpoints.addBeverageCover,
		// Endpoints.beverageRemove,
		// Endpoints.addBeverageGallery,
		// Endpoints.beverageDetailsAdmin,
		// Endpoints.updateBeverage,
		// Endpoints.places,
		// Endpoints.addPlace,
		// Endpoints.ingredients,
		// Endpoints.addIngredient,
		// Endpoints.styles,
		// Endpoints.addBeverageCap,
		// Endpoints.removeBeverageCap,
		// Endpoints.updateStyle
	].includes(endpoint);

	return fetch(completeUrl, {
		method,
		...(isProtectedRoute && { credentials: 'include' }),
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
