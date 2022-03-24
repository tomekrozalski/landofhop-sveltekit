import { customAlphabet } from 'nanoid';

function generateShortId() {
	const allowedTypes = 'abcdefghijklmnoprstuwvxyz01234567890';
	const generator = customAlphabet(allowedTypes, 6);
	const shortId = generator();

	return shortId;
}

export default generateShortId;
