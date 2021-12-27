import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import theme from '../../public/styles/theme';
import GlobalStyle from '../../public/styles/global-styles';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <meta charSet="utf-8" />
        <title>OPT</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
