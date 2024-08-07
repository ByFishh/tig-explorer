import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" translate="no">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-16x16.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/logo-32x32.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logo-16x16.svg"
        />
        <link rel="manifest" href="/logo-16x16/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/logo-16x16/safari-pinned-tab.svg"
          color="#FFFFFF"
        />
        <meta name="msapplication-TileColor" content="#111111" />

        <meta
          name="description"
          content="View and manage your TIG nodes with a single click in an all-in-one dashboard"
        ></meta>
        <meta name="title" content="TIG Explorer" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tig-explorer.com/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="TIG Explorer" />
        <meta
          property="og:description"
          content="View and manage your TIG nodes with a single click in an all-in-one dashboard"
        />
        <meta property="og:site_name" content="TIG Explorer" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/e-tech-test/image/upload/v1723055711/tig-frame_indhyd.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tig-explorer.com/" />
        <meta property="twitter:title" content="TIG Explorer" />
        <meta
          property="twitter:description"
          content="View and manage your TIG nodes with a single click in an all-in-one dashboard"
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/e-tech-test/image/upload/v1723055711/tig-frame_indhyd.png"
        ></meta>

        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#FFFFFF"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#111111"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
