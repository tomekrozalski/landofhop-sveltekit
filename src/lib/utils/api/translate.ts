import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function translate(values: any[], desiredLanguage: AppLanguage) {
	return (
		values.find((item) => item.language === desiredLanguage) ||
		values.find((item) => !item.language) ||
		values[0]
	);
}

export default translate;
