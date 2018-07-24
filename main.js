const Products = require('./src/database').Product;
const http = require('http');
const url = require('url');
//Products.initExampleData((err) => {console.log("Заполнили данные")});
/*
Products.all((err,products) => {
    if (err) return next(err);
    console.log(products[2]);
});

Products.find(123,(err,products) => {
    if (err) return next(err);
    console.log(products.product);
})
сделать простой API сервер
GET /products - возвращает json со списком продуктов
GET /products/123 - возвращает продукт с id 123
DELETE /products/123 удаляет
POST /products - создает новый из данных в теле поста
как сам продукт выглядит пока не важно

допустим id, name, description
попробуй для первой версии никакие сторонние модули не использовать
только клиент sqlite
*/

function accept(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache'
    });
    var route = url.parse(req.url).path;

    console.log(req.method);
    console.log(route);
    switch (req.method) {
        case "GET":
            switch (route) {
                case "/products": //возвращает json со списком продуктов
                    console.log("products");
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Cache-Control': 'no-cache'
                        }); 
                    Products.all((err,products) => {
                        if (err) return next(err);
                        //res.write(products[2]);
                        res.end(products);
                    });
                    //res.end("");
                    break;
                case "/products/123": // - возвращает продукт с id 123
                    console.log("products/123");
                        res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Cache-Control': 'no-cache'
                        }); 
                    Products.find(123,(err,products) => {
                        if (err) return next(err);
                        res.end(products.product);
                    });
                    break;
                default:
                res.end("Готов </p>" + 
                "<a href='/products'>Продукты</a></p>" + 
                "<a href='/products/123'>Продукты 123</a></p>");
            }
        case "DELETE":
            switch (route) {
                case "/products/123": // - удаляем продукт с id 123
                console.log("products/123");
                Products.delete(11,(err) => {
                    if (err) {return err} else {
                        res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Cache-Control': 'no-cache'
                        });
                        res.end("");
                    }
                });
                break;        
            }
            break;
        case "POST":
        break;
    }
  }
  
  http.createServer(accept).listen(8080);
  console.log("http://127.0.0.1:8080")
  
  