import type { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle from '../../public/styles/global-styles';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
      <GlobalStyle />
      <Head>
        <meta charSet="utf-8" />
        <title>OPT</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
