import type { InstitutionRaw, InstitutionEssence } from '$lib/utils/types/Institution';

type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
	owner: string | null;
	website: string | null;
};

export default function formatValues(
	{ badge, name, owner, website }: Input,
	institutions: InstitutionEssence[]
): InstitutionRaw {
	console.log({ institutions });

	return {
		badge: badge.trim(),
		name: name.map(({ language, value }) => ({
			language,
			value: value.trim()
		})),
		...(owner && { owner: institutions.find(({ shortId }) => shortId === owner) }),
		...(website && { website: website.replace(/http(s)?:\/\//, '') })
	};
}
