/* eslint-disable react/no-danger */
import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import FONTS from "../utils/loadFonts";

class LidbotDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <style dangerouslySetInnerHTML={{ __html: FONTS }} />
        </Head>
        <body>
          <style jsx global>{`
            body {
              margin: 0;
              padding: 0;
            }
          `}</style>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default LidbotDocument;
