import { Layout } from '@/components/Layout/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { getCategory } from '@/reducers/category/thunks';
import type { NextPage } from 'next';
import { baseApi } from '@/api';
import { getFooterMenu, getNavMenu } from '@/reducers/menu/thunks';
import { Page2 } from '@/screens/Page2/Page2';

const CartoonsPage: NextPage = () => {
	return (
		<Layout>
			<Page2 />
		</Layout>
	);
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ locale }) => {
	await baseApi.setLang(locale as string);

	if (locale) {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
		await dispatch(getCategory('page2'));
	} else {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
		await dispatch(getCategory('page2'));
	}

	return {
		props: {
			...(await serverSideTranslations(locale as string)),
		},
		revalidate: 1,
	};
});

export default CartoonsPage;
