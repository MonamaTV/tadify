import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Layout from "./layout";

function MyApp({ Component, pageProps, ...appProps }) {
  const userRoutes = [
    "/artists",
    "/plays",
    "/playlists",
    "/tracks",
    "/playlists/create",
    "/playlists/suggest",
  ];
  const {
    router: { pathname },
  } = appProps;

  if (userRoutes.includes(pathname)) {
    return (
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" enableSystem="true">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
