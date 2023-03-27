import { baseApi } from '@/api';
import { Layout } from '@/components/Layout/Layout';
import { getIP } from '@/reducers/auth/thunks';
import { getFooterMenu, getNavMenu } from '@/reducers/menu/thunks';
import { Success } from '@/screens/Success/Success';
import { wrapper } from '@/store/store';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RecoveryPage: NextPage = () => {
	return (
		<Layout>
			<Success />
		</Layout>
	);
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ locale }) => {
	await baseApi.setLang(locale as string);

	if (locale) {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
	} else {
		await dispatch(getIP());
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

export default RecoveryPage;
