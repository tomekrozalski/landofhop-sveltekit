import { writable, Writable } from 'svelte/store';
import type { Details } from '$lib/utils/types/Beverage/Details';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

const beverage: Writable<Details | null> = writable(null);
const next: Writable<Basics | null> = writable(null);
const previous: Writable<Basics | null> = writable(null);

export { beverage, next, previous };
