const Products = require('./src/database').Product;
const http = require('http');
const url = require('url');
const maxProducts =200;
//Products.initExampleData((err) => {console.log("Заполнили данные")});
function htmlOK(res){
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
}
function jsonOK(res){
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache'
        }); 
}
const productRoute ="products";
function sendefault(res){
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
    res.end("Готов </p>" + 
    "<a href='/" + productRoute + "'>Продукты</a></p>" + 
    "<a href='/" + productRoute + "/123'>Продукты 123</a></p>");
}
function sendAllProducts(res){
    console.log("get/products");
    jsonOK(res);
    Products.all((err,products) => {
        if (err) return next(err);
       res.end(JSON.stringify(products));
    });
}
function sendProduct(res,id) {
    console.log("get/products/" + id);
    jsonOK(res);
    Products.find(id,(err,products) => {
        if (err) return next(err);
        res.end(products.product);
    });
}

function deleteProduct(res,id) {
    console.log("delete/products/" + id);
    jsonOK(res);
    Products.delete(id,(err,products) => {
        res.end(JSON.stringify("OK"));
    });
}
//===========================================================

function accept(req, res) {
    htmlOK(res);
    var route = req.method+url.parse(req.url).path;
    var params = route.split("/");
    switch (params[0]) {
       case "GET":
            switch (params[1]) {   //продукты и т.п.
                case "":
                    sendefault(res);
                    break;
                case productRoute:   // продукты
                    switch (params.length) {
                        case 2:
                            sendAllProducts(res);
                            break;
                        case 3:
                            if ((params[2] > 0 ) && (params[2] < maxProducts)) {
                                   sendProduct(res,params[2]);
                            } else sendefault(res);
                            break;
                        default:
                        //sendefault(res);
                    }
                default:
            }
            break;
        case "DELETE":
            //jsonOK(res);res.end(JSON.stringify("OK"));console.log("delete");
            switch (params[1]) {   //продукты и т.п.
                case productRoute:   // продукты
                    switch (params.length) {
                        case 2:
                            //удалить все продукты здесь
                            break;
                        case 3:
                            if ((params[2] > 0 ) && (params[2] < maxProducts)) {
                                   deleteProduct(res,params[2]);
                            } else sendefault(res);
                            break;
                        default:
                        //sendefault(res);
                    }
                break;
                default:
            }
        break;
        default:
    }
  }
  
  http.createServer(accept).listen(8080);
  console.log("http://127.0.0.1:8080");
  
  