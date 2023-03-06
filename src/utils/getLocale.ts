export const getLocale = (locale: string) => {
	switch (locale) {
		case 'che':
			return 'che_CHE';
		case 'ru':
			return 'ru-RU';
		default:
			return 'ru-RU';
	}
};
