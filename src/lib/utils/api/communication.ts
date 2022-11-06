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
	return (customFetch || fetch)(path).then(handleResponse);
}

type PutDataProps = CommonCommunicationProps & {
	data: unknown;
};

export function putJsonData({ data, fetch: customFetch, path }: PutDataProps) {
	return (customFetch || fetch)(path, {
		method: 'PUT',
		body: JSON.stringify(data)
	}).then(handleResponse);
}
