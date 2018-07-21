var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

// ты мой текст тут видишь?
//

http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(8080);

console.log('Server running on port 8080');
console.log("http://127.0.0.1:8080/server.js")