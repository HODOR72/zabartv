import { Layout } from '@/components/Layout/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';
import { Cabinet } from '@/screens/Cabinet/Cabinet';
import type { NextPage } from 'next';

const CabinetPage: NextPage = () => {
	return (
		<Layout>
			<Cabinet />
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

export default CabinetPage;
