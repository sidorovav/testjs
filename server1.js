var http = require('http');
var url = require('url');
var querystring = require('querystring');

function accept(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'no-cache'
  });

  res.end("OK");
}

http.createServer(accept).listen(8080);
console.log("http://127.0.0.1:8080")