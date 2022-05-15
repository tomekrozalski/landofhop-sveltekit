export default function pushState(params: URLSearchParams) {
	window.history.pushState(
		{},
		'',
		params.toString() ? `${location.pathname}?${params}` : location.pathname
	);

	const event = new Event('popstate');
	window.dispatchEvent(event);
}
