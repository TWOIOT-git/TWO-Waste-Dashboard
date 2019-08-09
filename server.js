const http = require("http");
const next = require("next");
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
  server.get(/(.+)\/$/, (req, res) =>
  res.redirect(301, req.url.replace(/\/$/, ""))
  );
  server.get('/sensor/:id', (req, res) => {
    console.log('calling route /sensor/:id')
    return app.render(req, res, '/sensor', { id: req.params.id })
  })
  server.get("*", handle);
  const httpServer = http.createServer(server);
  httpServer.listen(port, err => {
    if (err) throw err;
  });
});
