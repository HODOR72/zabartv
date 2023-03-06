import { Layout } from '@/components/Layout/Layout';
import { NotFound } from '@/screens/NotFound/NotFound';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { baseApi } from '@/api';
import { getFooterMenu, getNavMenu } from '@/reducers/menu/thunks';

const NotFoundPage: NextPage = () => {
	return (
		<Layout headerVariant="absolute">
			<NotFound />
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

export default NotFoundPage;
