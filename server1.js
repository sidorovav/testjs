var http = require('http');
var url = require('url');
var querystring = require('querystring');
var dateFormat = require('dateformat');


// не знаю с ч
var ts_hms = Date.now();
var out = "Time now " + dateFormat(ts_hms, "isoDateTime")  //.format("%Y-%m-%d %H:%M:%S")
function accept(req, res) {

  console.log(req); // запусти сервер и попробуй зайти на http://127.0.0.1:8080/testtesttest

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'no-cache'
  });

  console.log(out)
  res.end(out);
  //res.end(out+"---"+req);
  //res.end(req.toString())
}

http.createServer(accept).listen(8080);
console.log("http://127.0.0.1:8080")
console.log(out) //F8 run F9 stop