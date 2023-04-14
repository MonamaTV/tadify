import Head from "next/head";

const Meta = ({ title = "Tadify", description = "" }) => {
  return (
    <Head>
      <link rel="shortcut icon" href="fav.svg" />
      <title>Tadify</title>
      <meta name="description" content="Get your Spotify top artists & track" />
      <meta
        name="keywords"
        content="Spotify, my top artists, my Spotify top artists, my Spotify stats, Spotify top tracks, Spotify recent plays"
      />
      <meta name="author" content="Tadima Monama" />

      <meta property="og:url" content="https://tadify.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`Tadify`} />
      <meta
        property="og:description"
        content={`Get your Spotify top artists & track`}
      />
      <meta property="og:image" content="./public/logo1.svg" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="https://tadify.vercel.app" />
      <meta property="twitter:url" content="https://tadify.vercel.app" />
      <meta name="twitter:title" content={`Tadify`} />
      <meta
        name="twitter:description"
        content={`Get your Spotify top artists & track`}
      />
      <meta name="twitter:image" content="./public/logo1.svg" />
    </Head>
  );
};

export default Meta;
