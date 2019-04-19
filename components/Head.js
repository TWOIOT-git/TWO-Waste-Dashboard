import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";

const TITLE = "lidbot";
const DESCRIPTION = "lidbot Waste Dashboard";
const OGURL = "https://razzle-client.herokuapp.com";
const OGIMAGE = "https://razzle-client.herokuapp.com";

const Head = ({ title, description, ogImage, url }) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:site" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage} />
    <meta property="og:image" content={ogImage} />
  </NextHead>
);

Head.defaultProps = {
  title: TITLE,
  description: DESCRIPTION,
  url: OGURL,
  ogImage: OGIMAGE
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  ogImage: PropTypes.string
};

export default Head;
