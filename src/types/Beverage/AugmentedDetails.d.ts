import { LinkData } from './LinkData';
import { Details } from './Details';

export type AugmentedDetails = {
	listPage: number;
	previous: LinkData | null;
	details: Details;
	next: LinkData | null;
};
