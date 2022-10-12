export const BEVERAGES_ON_PAGE = 60;
export const PHOTO_SERVER = 'https://d37wyie9v4a2ot.cloudfront.net';

export const DATE_FORMAT = {
	EN: 'yyyy, do LLL',
	PL: 'dd.MM.yyyy'
};

export const APP_LANGUAGE = {
	EN: 'EN',
	PL: 'PL'
};

type AppLanguageKeys = keyof typeof APP_LANGUAGE;
export type AppLanguageTypes = typeof APP_LANGUAGE[AppLanguageKeys];
