import React, { Component } from "react";
import NextHead from "next/head";

const TITLE = "lidbot";
const DESCRIPTION = "lidbot Waste Dashboard";
const OGURL = "https://razzle-client.herokuapp.com";
const OGIMAGE = "https://razzle-client.herokuapp.com";

export default (props) => (
  <NextHead>
    <title>{props.title || TITLE}</title>
    <meta name="description" content={props.description || DESCRIPTION} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:url" content={props.url || OGURL} />
    <meta property="og:title" content={props.title || TITLE} />
    <meta
      property="og:description"
      content={props.description || DESCRIPTION}
    />
    <meta name="twitter:site" content={props.url || OGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || OGIMAGE} />
    <meta property="og:image" content={props.ogImage || OGIMAGE} />
  </NextHead>
);
