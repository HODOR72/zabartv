import { Layout } from '@/components/Layout/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { getCategory } from '@/reducers/category/thunks';
import type { NextPage } from 'next';
import { getFooterMenu, getNavMenu } from '@/reducers/menu/thunks';
import { baseApi } from '@/api';
import { Music } from '@/screens/Music/Music';

const CartoonsPage: NextPage = () => {
	return (
		<Layout>
			<Music />
		</Layout>
	);
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ locale }) => {
	await baseApi.setLang(locale as string);

	if (locale) {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
		await dispatch(getCategory('music'));
	} else {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
		await dispatch(getCategory('music'));
	}

	return {
		props: {
			...(await serverSideTranslations(locale as string)),
		},
		revalidate: 1,
	};
});

export default CartoonsPage;
