import { LinkData } from './LinkData';
import { Details } from './Details';

export type AugmentedDetails = {
	previous: LinkData | null;
	details: Details;
	next: LinkData | null;
};
