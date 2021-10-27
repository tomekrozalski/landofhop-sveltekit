import { isAfter, isValid, differenceInDays } from 'date-fns';

type OptionsProps = {
	nullable?: boolean;
};

export function isValidDate(value: string, options: OptionsProps = {}) {
	if (options.nullable && value === null) {
		return true;
	}

	const group = value.match(/^(\d\d).(\d\d).(\d\d\d\d)$/);

	if (!group) {
		return false;
	}

	const [day, month, year] = group.slice(1);
	const formattedString = `${year}-${month}-${day}`;

	if (!isValid(new Date(formattedString))) {
		return false;
	}

	const isAfterAppBorn = isAfter(new Date(formattedString), new Date('2017-06-19'));
	const isBeforeTomorrow = differenceInDays(new Date(formattedString), new Date()) < 1;

	return isAfterAppBorn && isBeforeTomorrow;
}
