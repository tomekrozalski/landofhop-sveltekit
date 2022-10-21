import { formatLanguageValueToDb } from '$lib/utils/normalizers/language';
import type { Input, Output } from './types.d';

export default function formatValues({ badge, name, occurrences, parent, type }: Input): Output {
	return {
		badge: badge.trim(),
		name: formatLanguageValueToDb(name),
		occurrences,
		parent,
		type
	};
}
