const http = require("http");
// const https = require('https');
const next = require("next");
// const fs = require('fs')
const express = require("express");
const compression = require("compression");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Start the server
app.prepare().then(() => {
  const server = express();

  server.disable("x-powered-by");
  server.use(compression());

  // remove trailing slash
  server.get(/(.+)\/$/, (req, res) =>
    res.redirect(301, req.url.replace(/\/$/, ""))
  );

  server.get('/sensor/:id', (req, res) => {
    console.log('calling route /sensor/:id')
    return app.render(req, res, '/sensor', { id: req.params.id })
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

  server.get("*", handle);

  http.createServer(server)
    .listen(port, err => {
    if (err) throw err;
    else {
      console.log(`[HTTP] Listening on port ${port}!`)
    }
  });

  // https.createServer({
  //   key: fs.readFileSync('certs/server.key'),
  //   cert: fs.readFileSync('certs/server.cert')
  // }, server)
  //   .listen(3001, err => {
  //   if (err) throw err;
  //   else {
  //     console.log(`[HTTPS] Listening on port ${port}!`)
  //   }
  // });

});
