export default function setSearchParam(phrase: string) {
	const value = encodeURIComponent(phrase);

	const origin = window.location.origin;
	const path = window.location.pathname;
	const newUrl = value ? origin + path + '?search=' + value.toLowerCase() : origin + path;
	window.history.pushState({ path: newUrl }, '', newUrl);
}
