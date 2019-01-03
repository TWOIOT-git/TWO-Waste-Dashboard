import App from './applications'
import React from 'react'
import { UserProvider } from './providers/UserProvider';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import MobileDetect from 'mobile-detect'
import express from 'express'

const description = 'Lidbot waste dashboard'
const keywords = 'lidbot, waste, dashboard, realtime'
const defaultOGImage = '/assets/favicons/android-icon-192x192.png'
const openGraphImageWidth = 192
const openGraphImageHeight = 192
const defaultDescription = description
const defaultOGURL = 'https://analytics.twoiot.com'
const title = 'Lidbot'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server.disable('x-powered-by')

server.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

server.get('*', (req, res) => {
  const md = new MobileDetect(req.headers['user-agent']);
  let defaultScreenClass = 'xl';
  if (md.phone() !== null) defaultScreenClass = 'xs';
  if (md.tablet() !== null) defaultScreenClass = 'md';
  const context = {};
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <UserProvider>
        <App defaultScreenClass={defaultScreenClass} />
      </UserProvider>
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(`
<!doctype html>
<html lang="en">
<head>
<title>Lidbot - Waste Dashboard</title>
<meta charSet="UTF-8">
<meta name="description" content=${description} />
<meta name="keywords" content=${keywords} />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta property="og:image" content=${defaultOGImage} />
<meta property="og:image:width" content=${openGraphImageWidth} />
<meta property="og:image:height" content=${openGraphImageHeight} />
<meta property="og:url" content=${defaultOGURL} />
<meta property="og:title" content=${title} />
<meta property="og:description" content=${defaultDescription} />
<meta name="twitter:site" content=${defaultOGURL} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content=${defaultOGImage} />
<link rel="manifest" href="/favicons/manifest.json" />
<link rel="shortcut icon" href="/assets/favicons/favicon.ico" />
<link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
<meta name="msapplication-TileColor" content="#00CD98">
<meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png">
<meta name="theme-color" content="#00CD98">
${ assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
${ process.env.NODE_ENV === 'production' ? `<script src="${assets.client.js}" defer></script>` : `<script src="${assets.client.js}" defer crossorigin></script>`}
</head>
  <body>
      <div id="root">${markup}</div>
  </body>
</html>
`);
  }
});

export default server;
