type DataCallProps = {
	fetch?: (info: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
	path: string;
};

export function getJsonData({ fetch: customFetch, path }: DataCallProps) {
	const host = import.meta.env.VITE_HOST;

	return (customFetch || fetch)(host + path)
		.then((response) => response.json())
		.catch((error) => {
			console.error(error);
		});
}
