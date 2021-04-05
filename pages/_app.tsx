// import '../styles/globals.css'
// import type { AppProps /*, AppContext */ } from 'next/app';
// import 'reflect-metadata';

// const MyApp = ({ Component, pageProps }: AppProps) => {
//   return <Component {...pageProps} />;
// };

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }

// export default MyApp;

import React from 'react';
// Modules
import { AppProps } from 'next/app';
import Head from 'next/head';
// MUI Core
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
// Utils
import theme from '../utils/theme';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider, ApolloClient as ApolloHooksClient, createHttpLink as hookCreateHttpLink, InMemoryCache as hookInMemoryCache } from '@apollo/react-hooks';

const httpLink = createHttpLink({
  uri: 'http://localhost:2/api/graphql',
});

const HookHttpLink = hookCreateHttpLink({
  uri: 'http://localhost:2/api/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const hookClient = new ApolloHooksClient({
  link: HookHttpLink,
  cache: new hookInMemoryCache(),
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={hookClient}>
          <Head>
            <title>Todo App</title>
            <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
