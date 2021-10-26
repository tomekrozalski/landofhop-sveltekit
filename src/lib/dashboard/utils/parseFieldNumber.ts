export function parseFieldNumber(value: string): number {
	return +value.toString().replace(',', '.');
}
