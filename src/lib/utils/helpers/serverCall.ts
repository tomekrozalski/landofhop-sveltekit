export enum Endpoints {
	addBeverage = 'admin/beverage',
	addBeverageCover = 'admin/beverage/cover',
	addBeverageGallery = 'admin/beverage/gallery',
	addIngredient = 'admin/ingredient',
	addInstitution = 'admin/institution',
	addPlace = 'admin/place',
	authorize = 'authorize',
	beverageAdminNotes = 'admin/beverage/notes',
	beverageBasics = 'basics',
	beverageDetails = 'details',
	beverageDetailsAdmin = 'admin/details',
	beveragePhotos = 'admin/beverage/photos',
	beverageRemove = 'admin/beverage',
	beverageSearch = 'beverage/search',
	beverageStats = 'beverage/stats',
	beverageTotal = 'beverage/total',
	ingredients = 'admin/ingredient',
	institutions = 'admin/institution',
	places = 'admin/place',
	unauthorize = 'unauthorize',
	updateBeverage = 'admin/beverage',
	verifyToken = 'verifyToken'
}

type Props = {
	body?: string | FormData;
	formData?: boolean;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	pathParams?: (string | number)[];
};

function serverCall(fetch, endpoint: Endpoints, props?: Props) {
	const { formData = false, method = 'GET', pathParams, ...rest } = props || {};

	const baseUrl = `${import.meta.env.VITE_API_SERVER}/${endpoint}`;
	const completeUrl = pathParams?.length ? `${baseUrl}/${pathParams.join('/')}` : baseUrl;
	const isProtectedRoute = [
		Endpoints.authorize,
		Endpoints.beverageAdminNotes,
		Endpoints.unauthorize,
		Endpoints.verifyToken,
		Endpoints.institutions,
		Endpoints.addInstitution,
		Endpoints.addBeverage,
		Endpoints.beveragePhotos,
		Endpoints.addBeverageCover,
		Endpoints.beverageRemove,
		Endpoints.addBeverageGallery,
		Endpoints.beverageDetailsAdmin,
		Endpoints.updateBeverage,
		Endpoints.places,
		Endpoints.addPlace,
		Endpoints.ingredients,
		Endpoints.addIngredient
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

export default serverCall;
