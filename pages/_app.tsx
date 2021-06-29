/* eslint-disable prettier/prettier */
import '@styles/globals.scss';

import { CategoryProvider } from '@contexts/CategoryContext';
import { ThemeProvider } from '@contexts/ThemeContext';
import { AppProps } from 'next/app';
import Head from 'next/head';


const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider>
      <CategoryProvider>
        <Head>
          <title>Raul Sigoli</title>
        </Head>
        <Component {...pageProps} />
      </CategoryProvider>
    </ThemeProvider>
  );
};

export default MyApp;
