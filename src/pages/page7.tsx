import { Layout } from '@/components/Layout/Layout';
import { Cartoons } from '@/screens/Cartoons/Cartoons';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { getCategory } from '@/reducers/category/thunks';
import type { NextPage } from 'next';
import { baseApi } from '@/api';
import { getFooterMenu, getNavMenu } from '@/reducers/menu/thunks';
import { Music } from '@/screens/Music/Music';
import { Movies } from '@/screens/Movies/Movies';
import { Page1 } from '@/screens/Page1/Page1';
import { Page7 } from '@/screens/Page7/Page7';

const CartoonsPage: NextPage = () => {
	return (
		<Layout>
			<Page7 />
		</Layout>
	);
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ locale }) => {
	await baseApi.setLang(locale as string);

	if (locale) {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
		await dispatch(getCategory('page7'));
	} else {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
		await dispatch(getCategory('page7'));
	}

	return {
		props: {
			...(await serverSideTranslations(locale as string)),
		},
		revalidate: 1,
	};
});

export default CartoonsPage;
