import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Layout from "./components/layout";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </Layout>
  );
}

export default MyApp;
