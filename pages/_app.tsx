import '../styles/global.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '../resources/theme';
import { GlobalStyle } from '../resources/globalStyles';
import NavLayout from '../layouts/NavLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <NavLayout>
          <Component {...pageProps} />
        </NavLayout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
