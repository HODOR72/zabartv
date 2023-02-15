export const getType = (id: number | undefined) => {
	switch (id) {
		case 1:
			return 'Film';
		case 2:
			return 'Serial';
		case 3:
			return 'Cartoon';
		case 4:
			return 'Animated series';
		case 5:
			return 'Video';
		case 6:
			return 'TV';
		default:
			return '21412';
	}
};
