import { Layout } from '@/components/Layout/Layout';
import { Subscribe } from '@/screens/Subscribe/Subscribe';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { getPackages } from '@/reducers/packages/thunks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next';
import { baseApi } from '@/api';
import { getFooterMenu, getNavMenu } from '@/reducers/menu/thunks';

const SubscribePage: NextPage = () => {
	return (
		<Layout>
			<Subscribe />
		</Layout>
	);
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ locale }) => {
	await baseApi.setLang(locale as string);

	if (locale) {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
		await dispatch(getPackages());
	} else {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
		await dispatch(getPackages());
	}

	return {
		props: {
			...(await serverSideTranslations(locale as string)),
		},
		revalidate: 1,
	};
});

export default SubscribePage;
