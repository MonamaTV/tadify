import "../styles/globals.css";
import Layout from "./layout";

function MyApp({ Component, pageProps, ...appProps }) {
  const defaultRoutes = ["/", "/home", "/app"];
  const {
    router: { pathname },
  } = appProps;

  if (defaultRoutes.includes(pathname)) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
