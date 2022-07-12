import { tweened } from 'svelte/motion';

const ratingStore = tweened<number>(0);

export default ratingStore;
