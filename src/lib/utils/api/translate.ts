import type { AppLanguage } from '$types/enums/Globals.enum';
import type { LanguageValue } from '$types/LanguageValue.d';

function translate(values: LanguageValue[], desiredLanguage: AppLanguage): LanguageValue {
	return (
		values.find((item) => item.language === desiredLanguage) ||
		values.find((item) => !item.language) ||
		values[0]
	);
}

export default translate;
