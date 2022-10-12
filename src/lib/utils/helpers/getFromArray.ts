import type { APP_LANGUAGE_KEYS_VALUES } from '$constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFromArray(values: any[], desiredLanguage: APP_LANGUAGE_KEYS_VALUES) {
	return (
		values.find((item) => item.language === desiredLanguage) ||
		values.find((item) => !item.language) ||
		values[0]
	);
}
