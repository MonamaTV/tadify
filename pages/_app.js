import { ThemeProvider } from "next-themes";
import { userRoutes } from "../src/utils/app";
import "../styles/globals.css";
import Layout from "./layout";

function MyApp({ Component, pageProps, ...appProps }) {
  const {
    router: { pathname },
  } = appProps;

  const isLoggedIn = userRoutes.includes(pathname);

  return (
    <ThemeProvider attribute="class" enableSystem="true">
      {isLoggedIn ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}

export default MyApp;
