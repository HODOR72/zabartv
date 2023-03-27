import type { NextPage } from 'next';
import { Layout } from '@/components/Layout/Layout';
import { baseApi } from '@/api';
import { Hero, Category, Music } from '@/screens/Home/index';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { getHeroMovies, getHomeCategories } from '@/reducers/home/thunks';
import { Player } from '@/components/Player/Player';
import { getFooterMenu, getNavMenu } from '@/reducers/menu/thunks';

const HomePage: NextPage = () => {
	return (
		<Layout>
			<Hero />
			<Category />
			{/* <Music /> */}
			<Player />
		</Layout>
	);
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ locale }) => {
	await baseApi.setLang(locale as string);

	if (locale) {
		await dispatch(getIP());
		await dispatch(getHomeCategories());
		await dispatch(getHeroMovies());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
	} else {
		await dispatch(getIP());
		await dispatch(getHomeCategories());
		await dispatch(getHeroMovies());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
	}

	return {
		props: {
			...(await serverSideTranslations(locale as string)),
		},
		revalidate: 1,
	};
});

export default HomePage;
