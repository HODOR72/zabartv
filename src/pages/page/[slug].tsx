import { Layout } from '@/components/Layout/Layout';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPageBySlug } from '@/reducers/movie/thunks';
import type { NextPage } from 'next';
import { baseApi } from '@/api';
import { getFooterMenu, getNavMenu } from '@/reducers/menu/thunks';
import { Cartoons } from '@/screens/Cartoons/Cartoons';

const MoviePage: NextPage = () => {
	return (
		<Layout sticky headerVariant="blur">
			<Cartoons />
		</Layout>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	({ dispatch }) =>
		async ({ query: { slug }, locale }) => {
			await baseApi.setLang(locale as string);

			if (locale) {
				await dispatch(getNavMenu());
				await dispatch(getFooterMenu());
				await dispatch(getIP());
				await dispatch(getPageBySlug(slug as string));
			} else {
				await dispatch(getNavMenu());
				await dispatch(getFooterMenu());
				await dispatch(getIP());
				await dispatch(getPageBySlug(slug as string));
			}

			return {
				props: {
					...(await serverSideTranslations(locale as string)),
				},
			};
		}
);

export default MoviePage;
