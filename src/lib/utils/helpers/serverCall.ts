export enum Endpoints {
	// addCountry = 'country',
	// addIngredient = 'ingredient',
	// addInstitution = 'institution',
	// addLanguage = 'language',
	// addPlace = 'place',
	// beverageAdminDetails = 'beverage/admin/details',
	beverageBasics = 'beverage/basics',
	// beverageDashboardDetails = 'beverage/admin/dashboard',
	// beverageDetails = 'beverage/details',
	// beverageSearch = 'beverage/search',
	// beverageStats = 'beverage/stats',
	beverageTotal = 'beverage/total'
	// country = 'country/getAll',
	// ingredient = 'ingredient/getAll',
	// institution = 'institution/getAll',
	// language = 'language/getAll',
	// login = 'auth',
	// place = 'place/getAll',
	// removeBeverage = 'beverage',
	// saveBeverage = 'beverage',
}

type Props = {
	formData?: boolean;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	pathParams?: (string | number)[];
	token?: string;
	body?: string | FormData;
};

const serverCall = (endpoint: Endpoints, props?: Props) => {
	const { formData = false, method = 'GET', pathParams, token, ...rest } = props || {};

	const baseUrl = `${import.meta.env.VITE_API_SERVER}/${endpoint}`;
	const completeUrl = pathParams?.length ? `${baseUrl}/${pathParams.join('/')}` : baseUrl;

	return fetch(completeUrl, {
		method,
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			...(!formData && { 'Content-Type': 'application/json' })
		},
		...rest
	}).then((response) => {
		if (response.status >= 300) {
			throw new Error(response.statusText);
		}

		return response.json();
	});
};

export default serverCall;
