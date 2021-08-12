export default function setSearchParam(value: string) {
	const origin = window.location.origin;
	const path = window.location.pathname;
	const newUrl = value ? origin + path + '?search=' + value : origin + path;
	window.history.pushState({ path: newUrl }, '', newUrl);
}
