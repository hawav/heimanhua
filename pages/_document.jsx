// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <title>嘿，漫画！</title>
          <script data-ad-client="ca-pub-2712478982001783" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          {/* <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=UA-153477912-2'
          ></script> */}

          {/* <link
            href='https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
            rel='stylesheet'
          ></link> */}
        </Head>
        <body className='custom_class'>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
