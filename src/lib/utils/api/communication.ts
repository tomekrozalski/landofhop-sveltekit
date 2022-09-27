const host = import.meta.env.VITE_HOST;

function handleResponse(response: Response) {
	if (response.status >= 300) {
		throw new Error(response.statusText);
	}

	return response.json();
}

type GetJsonDataProps = {
	fetch?: (info: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
	path: string;
};

export function getJsonData({ fetch: customFetch, path }: GetJsonDataProps) {
	return (customFetch || fetch)(host + path).then(handleResponse);
}

type PostJsonDataProps = {
	data: unknown;
	fetch?: (info: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
	path: string;
};

export function postJsonData({ data, fetch: customFetch, path }: PostJsonDataProps) {
	return (customFetch || fetch)(host + path, {
		method: 'POST',
		body: JSON.stringify(data)
	}).then(handleResponse);
}

type PostFormDataProps = {
	data: FormData;
	fetch?: (info: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
	path: string;
};

export function postFormData({ data, fetch: customFetch, path }: PostFormDataProps) {
	return (customFetch || fetch)(host + path, {
		method: 'POST',
		body: data
	}).then(handleResponse);
}

type PutDataProps = {
	data: unknown;
	fetch?: (info: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
	path: string;
};

export function putJsonData({ data, fetch: customFetch, path }: PutDataProps) {
	return (customFetch || fetch)(host + path, {
		method: 'PUT',
		body: JSON.stringify(data)
	}).then(handleResponse);
}

type DeleteJsonDataProps = {
	fetch?: (info: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
	path: string;
};

export function deleteJsonData({ fetch: customFetch, path }: DeleteJsonDataProps) {
	return (customFetch || fetch)(host + path, {
		method: 'DELETE'
	}).then(handleResponse);
}
