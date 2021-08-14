export default function removeOrphans(text: string): string {
	try {
		// @ToDo: unfortunatelly does not work with Svelte @html yet
		const formattedText = text.replaceAll(/\s(?=(\S){1,2}(?!\S))/g, '&nbsp;');

		return formattedText;
	} catch (err) {
		console.log(err);
	}

	return text;
}
