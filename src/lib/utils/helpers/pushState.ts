export default function pushState(params: URLSearchParams) {
	window.history.pushState({}, '', `${location.pathname}?${params}`);

	const event = new Event('popstate');
	window.dispatchEvent(event);
}
