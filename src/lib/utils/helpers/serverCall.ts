export enum Endpoints {
	addBeverage = 'admin/beverage',
	addInstitution = 'admin/institution',
	authorize = 'authorize',
	beverageAdminNotes = 'admin/beverage/notes',
	beverageBasics = 'basics',
	beverageDetails = 'details',
	beveragePhotos = 'admin/beverage/photos',
	beverageSearch = 'beverage/search',
	beverageStats = 'beverage/stats',
	beverageTotal = 'beverage/total',
	institutions = 'admin/institutions',
	unauthorize = 'unauthorize',
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
		Endpoints.beveragePhotos
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
