import { Layout } from '@/components/Layout/Layout';
import { Movie } from '@/screens/Movie/Movie';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getMovieBySlug } from '@/reducers/movie/thunks';
import { Player } from '@/components/Player/Player';
import type { NextPage } from 'next';
import { getFooterMenu, getNavMenu } from '@/reducers/menu/thunks';
import { baseApi } from '@/api';

const MoviePage: NextPage = () => {
	return (
		<Layout sticky headerVariant="blur">
			<Movie />
			<Player />
		</Layout>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	({ dispatch }) =>
		async ({ query: { slug }, locale }) => {
			await baseApi.setLang(locale as string);

			if (locale) {
				await dispatch(getIP());
				await dispatch(getMovieBySlug(slug as string));
				await dispatch(getNavMenu());
				await dispatch(getFooterMenu());
			} else {
				await dispatch(getIP());
				await dispatch(getMovieBySlug(slug as string));
				await dispatch(getNavMenu());
				await dispatch(getFooterMenu());
			}

			return {
				props: {
					...(await serverSideTranslations(locale as string)),
				},
			};
		}
);

export default MoviePage;
