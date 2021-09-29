// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFromArray(values: any[], desiredLanguage: 'pl' | 'en') {
	return (
		values.find((item) => item.language === desiredLanguage) ||
		values.find((item) => !item.language) ||
		values[0]
	);
}
