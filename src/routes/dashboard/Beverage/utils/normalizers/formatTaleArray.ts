type Input = {
	article: string;
	language: string;
	lead: string;
};

type Output = {
	article?: string;
	language: string;
	lead: string;
};

export const formatTaleArray = ({ article, language, lead }: Input): Output => ({
	...(article && { article: article.trim() }),
	language,
	lead: lead.trim()
});
