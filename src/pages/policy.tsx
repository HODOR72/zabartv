import { Layout } from '@/components/Layout/Layout';
import { Policy } from '@/screens/Policy/Policy';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next';
import { wrapper } from '@/store/store';
import { getIP } from '@/reducers/auth/thunks';

const PolicyPage: NextPage = () => {
	return (
		<Layout>
			<Policy />
		</Layout>
	);
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ locale }) => {
	await dispatch(getIP());

	return {
		props: {
			...(await serverSideTranslations(locale as string)),
		},
	};
});

export default PolicyPage;
