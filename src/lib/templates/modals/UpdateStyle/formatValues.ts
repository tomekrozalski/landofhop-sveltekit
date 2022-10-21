import { formatLanguageValueToDb } from '$lib/utils/normalizers/language';
import type { Input, Output } from './types.d';

export default function formatValues({ badge, name, group }: Input): Output {
	return {
		badge: badge.trim(),
		name: formatLanguageValueToDb(name),
		group
	};
}
