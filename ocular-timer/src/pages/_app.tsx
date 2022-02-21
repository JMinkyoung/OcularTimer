import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import theme from '../../public/styles/theme';
import GlobalStyle from '../../public/styles/global-styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const store = createStore(rootReducer,composeWithDevTools());
const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Head>
          <meta charSet="utf-8" />
          <title>OCT</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
