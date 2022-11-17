import { Layout } from '@/components/Layout/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { Recovery } from '@/screens/Recovery/Recovery';

const RecoveryPage: NextPage = () => {
	return (
		<Layout>
			<Recovery />
		</Layout>
	);
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ locale }) => {
	await dispatch(getIP());

	return {
		props: {
			...(await serverSideTranslations(locale as string)),
		},
		revalidate: 1,
	};
});

export default RecoveryPage;
