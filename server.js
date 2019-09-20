const http = require("http");
const next = require("next");
const fs = require('fs')
const express = require("express");
const compression = require("compression");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const nextI18NextMiddleware = require('next-i18next/middleware').default
const nextI18next = require('./i18n')

// Start the server
app.prepare().then(() => {
  const server = express();

  server.disable("x-powered-by");
  server.use(compression());
  server.use(nextI18NextMiddleware(nextI18next))

  // remove trailing slash
  server.get(/(.+)\/$/, (req, res) =>
    res.redirect(301, req.url.replace(/\/$/, ""))
  );

  server.get('/sensor/:id', (req, res) => {
    console.log('calling route /sensor/:id')
    return app.render(req, res, '/sensor', { id: req.params.id })
  })

  server.get('/forgot/:email', (req, res) => {
    return app.render(req, res, '/forgot', { email: req.params.email })
  })

  server.get('/reset-password/:email/:code/:language', (req, res) => {
    return app.render(req, res, '/reset-password', { email: req.params.email, code: req.params.code, language: req.params.language })
  })

  server.get('/confirm/:email/:code/:language', (req, res) => {
    return app.render(req, res, '/confirm', { email: req.params.email, code: req.params.code, language: req.params.language })
  })

  // redirect http => https on production only
  if(process.env.NODE_ENV === 'production') {
    server.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https') {
        console.log('redirect (http => https) ');
        res.redirect(`https://${req.header('host')}${req.url}`)
      } else {
        next()
      }
    })
  }

  // service worker
  server.get('/sw.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript');
    fs.createReadStream('./utils/sw.js').pipe(res);
  })

  server.get("*", handle);

  http.createServer(server)
    .listen(port, err => {
    if (err) throw err;
    else {
      console.log(`[HTTP] Listening on port ${port}!`)
    }
  });

});
