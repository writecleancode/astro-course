type slugifyType = (text: string | number) => string;
type formatDateType = (date: Date) => string;
type optionsType = {
	filterOutDrafts?: boolean;
	filterOutFuturePosts?: boolean;
	sortByDate?: boolean;
	limit?: number | undefined;
};
type formatBlogPosts = (posts: any[], {}?: optionsType) => object[];

export const slugify: slugifyType = text => {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
};

export const formatDate: formatDateType = date => {
	return new Date(date).toLocaleDateString('pl-PL', {
		timeZone: 'UTC',
	});
};

export const formatBlogPosts: formatBlogPosts = (
	posts,
	{ filterOutDrafts = true, filterOutFuturePosts = true, sortByDate = true, limit = undefined } = {}
) => {
	const filteredPosts = posts.reduce((acc, post) => {
		const { date, draft } = post.frontmatter;
		// filterOutDrafts if true
		if (filterOutDrafts && draft) return acc;

		// filterOutFuturePosts if true
		if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

		// add post to acc
		acc.push(post);

		return acc;
	}, []);

	if (sortByDate) {
		filteredPosts.sort((a: any, b: any) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
	} else {
		filteredPosts.sort(() => Math.random() - 0.5);
	}

	// limit if number is passed
	if (typeof limit === 'number') filteredPosts.slice(0, limit);
	return filteredPosts;
};
