// eslint-disable-next-line @typescript-eslint/no-explicit-any
function translate(values: any[], desiredLanguage: 'pl' | 'en') {
	return (
		values.find((item) => item.language === desiredLanguage) ||
		values.find((item) => !item.language) ||
		values[0]
	);
}

export default translate;
