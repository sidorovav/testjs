var http = require('http');
var url = require('url');
var querystring = require('querystring');
var dateFormat = require('dateformat');

function accept(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
  var route = url.parse(req.url).path
  console.log(route)
  switch (route) {
    case "/time":
      /*
      var timerId = setTimeout(t1,1000,res);
      
      */
      res.write("Ждите ..."); // был write
      setTimeout(function () {
        res.end(mytime())
      }, 1000);

      break
    default:
      res.end("Привет Андрей! Смотри " + "<a href='/time'>Время</a>")
  }

}

function mytime()
{
  return "Time now " + dateFormat(Date.now(), "mediumTime");
}
function t1(res) {
  console.log("dzin");
  res.end("Time now " + dateFormat(Date.now(), "mediumTime"))
}
http.createServer(accept).listen(8080);
console.log("http://127.0.0.1:8080")
//F8 run F9 stop
