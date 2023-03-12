import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Layout from "./layout";

function MyApp({ Component, pageProps, ...appProps }) {
  const defaultRoutes = ["/", "/home", "/app"];
  const {
    router: { pathname },
  } = appProps;

  if (defaultRoutes.includes(pathname)) {
    return (
      <ThemeProvider attribute="class" enableSystem="true">
        <Component {...pageProps} />;
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
