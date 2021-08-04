import { Basics } from './Basics';
import { Details } from './Details';

export type AugmentedDetails = {
	previous: Basics | null;
	details: Details;
	next: Basics | null;
};
