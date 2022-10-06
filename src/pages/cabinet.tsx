import { Layout } from '@/components/Layout/Layout';
import { Cabinet } from '@/screens/Cabinet/Cabinet';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next';
import { wrapper } from '@/store/store';
import { getHistoryPayments, getIP, getMe } from '@/api';

const CabinetPage: NextPage = () => {
	return (
		<Layout>
			<Cabinet />
		</Layout>
	);
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ locale }) => {
	const {
		payload: { id },
	} = await dispatch(getMe());
	await dispatch(getIP());
	await dispatch(getHistoryPayments(1));

	return {
		props: {
			...(await serverSideTranslations(locale as string)),
		},
	};
});

export default CabinetPage;
