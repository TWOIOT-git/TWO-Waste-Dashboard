import React from "react";
import App, { Container } from "next/app";
import { appWithTranslation } from "../i18n";
import CSSFiles from "../components/CSSFiles";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <CSSFiles>
          <Component {...pageProps} />
        </CSSFiles>
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
