import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import theme from '../../public/styles/theme';
import GlobalStyle from '../../public/styles/global-styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../modules';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer,composeWithDevTools());

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <meta charSet="utf-8" />
        <title>OPT</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
    </Provider>
  )
}

export default MyApp
