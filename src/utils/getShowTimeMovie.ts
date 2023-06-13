import { useTranslation } from 'next-i18next';

const getShowTimeMovie = (hours: number | undefined, minutes: number | undefined) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = useTranslation();
	let out_hours = new Intl.NumberFormat('ru-RU', {
		style: 'unit',
		unit: 'hour',
		unitDisplay: 'long',
	}).format(Number(hours));
	out_hours = out_hours.split(' ')[0] + ' ' + t(out_hours.split(' ')[1]);

	let out_minutes = new Intl.NumberFormat('ru-RU', {
		style: 'unit',
		unit: 'minute',
		unitDisplay: 'long',
	}).format(Number(minutes));
	out_minutes = out_minutes.split(' ')[0] + ' ' + t(out_minutes.split(' ')[1]);

	return hours !== 0 ? `${out_hours} ${out_minutes}` : `${out_minutes}`;
};

export default getShowTimeMovie;
