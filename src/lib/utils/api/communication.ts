import { PUBLIC_HOST } from '$env/static/public';

function handleResponse(response: Response) {
	if (response.status >= 300) {
		throw new Error(response.statusText);
	}

	return response.json();
}

type CommonCommunicationProps = {
	fetch?: (info: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
	path: string;
};

export function getJsonData({ fetch: customFetch, path }: CommonCommunicationProps) {
	return (customFetch || fetch)(PUBLIC_HOST + path).then(handleResponse);
}

type PostJsonDataProps = CommonCommunicationProps & {
	data: unknown;
};

export function postJsonData({ data, fetch: customFetch, path }: PostJsonDataProps) {
	return (customFetch || fetch)(PUBLIC_HOST + path, {
		method: 'POST',
		body: JSON.stringify(data)
	}).then(handleResponse);
}

type PostFormDataProps = CommonCommunicationProps & {
	data: FormData;
};

export function postFormData({ data, fetch: customFetch, path }: PostFormDataProps) {
	return (customFetch || fetch)(PUBLIC_HOST + path, {
		method: 'POST',
		body: data
	}).then(handleResponse);
}

type PutDataProps = CommonCommunicationProps & {
	data: unknown;
};

export function putJsonData({ data, fetch: customFetch, path }: PutDataProps) {
	return (customFetch || fetch)(PUBLIC_HOST + path, {
		method: 'PUT',
		body: JSON.stringify(data)
	}).then(handleResponse);
}

export function deleteJsonData({ fetch: customFetch, path }: CommonCommunicationProps) {
	return (customFetch || fetch)(PUBLIC_HOST + path, {
		method: 'DELETE'
	}).then(handleResponse);
}
