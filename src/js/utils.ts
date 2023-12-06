export const slugify = (text: string | number) => {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
};

export const formatDate = (date: Date) => {
	return new Date(date).toLocaleDateString('pl-PL', {
		timeZone: 'UTC',
	});
};
