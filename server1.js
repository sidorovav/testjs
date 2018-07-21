var http = require('http');
var url = require('url');
var querystring = require('querystring');
var dateFormat = require('dateformat');


// не знаю с ч
var ts_hms = Date.now();
//var out = "Time now " + dateFormat(ts_hms, "isoDateTime")  //.format("%Y-%m-%d %H:%M:%S")
function accept(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
  var route = url.parse(req.url).path
  switch (route) {
    case "/time": res.end("Time now " + dateFormat(ts_hms, "mediumTime"));
      break
    default:
      res.end("Привет Андрей! Смотри "+ "<a href='/time'>Время</a>")
  }

  console.log(url.parse(req.url).path)

}

http.createServer(accept).listen(8080);
console.log("http://127.0.0.1:8080")
//F8 run F9 stop