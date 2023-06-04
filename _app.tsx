import 'normalize.css';
import '@/styles/main.scss';
import '@/styles/fonts.scss';
import type { AppProps } from 'next/app';
import NextProgress from 'next-progress';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest }: AppProps) {
	const { store, props } = wrapper.useWrappedStore(rest);
	console.log('updated')
	return (
		<Provider store={store}>
			<ThemeProvider enableSystem={false} defaultTheme="dark">
				<Head>
					<title>ZabarTV</title>
					<meta name="theme-color" content="#0c101f" />
					<meta name="description" content="ZabarTV - фильмы и сериалы" />
					<meta name="keywords" content="фильмы сериалы мультфильмы" />
					<meta property="og:description" content="ZabarTV - фильмы и сериалы" />
					<link rel="icon" href="/favicon.ico" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
				</Head>
				<NextProgress
					color="var(--color-primary)"
					height={4}
					delay={300}
					options={{ showSpinner: false }}
				/>
				<Component {...props} />
			</ThemeProvider>
		</Provider>
	);
}

export default appWithTranslation(MyApp);
