import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import type { LanguageValue } from '$types/common/LanguageValue';

function translate(values: LanguageValue[], desiredLanguage: AppLanguage) {
	return (
		values.find((item) => item.language === desiredLanguage) ||
		values.find((item) => !item.language) ||
		values[0]
	);
}

export default translate;
