import { Layout } from '@/components/Layout/Layout';
import { About } from '@/screens/About/About';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { getPage } from '@/reducers/page/thunks';
import { baseApi } from '@/api';
import { getFooterMenu, getNavMenu } from '@/reducers/menu/thunks';

const AboutPage: NextPage = () => {
	return (
		<Layout headerVariant="absolute">
			<About />
		</Layout>
	);
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ locale }) => {
	await baseApi.setLang(locale as string);

	if (locale) {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
		await dispatch(getPage('about'));
	} else {
		await dispatch(getIP());
		await dispatch(getNavMenu());
		await dispatch(getFooterMenu());
		await dispatch(getPage('about'));
	}

	return {
		props: {
			...(await serverSideTranslations(locale as string)),
		},
		revalidate: 1,
	};
});

export default AboutPage;
