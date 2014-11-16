/*!
 * app.js
 */

"use strict";

/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var fs = require('fs');

var PORT = 8484;

var app = http.createServer(function handle(req, res) {
  var filePath;
  if (req.url === '/') {
    filePath = path.join(__dirname, 'views/home.html');
  } else if (req.url.indexOf('/assets') === 0) {
    filePath = path.join(__dirname, req.url);
  } else {
    filePath = path.join(__dirname, 'views', req.url);
  }
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    return res.end('page not found.');
  }
  return fs.readFile(filePath, 'utf-8', function (err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('oops, error occurred.');
    }
    res.writeHead(200);
    return res.end(data);
  });
});

app.listen(PORT);

console.log('[%s] [master:%d] Server started, listen at %d',
  new Date(), process.pid, PORT);
