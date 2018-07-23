var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/db1.db');
// http://www.sqlitetutorial.net/sqlite-nodejs/query/
function productInitData(db, cb) {
    //function insertProduct(cb) {
    var testproduct = {
        id: 1,
        product: {
            name: "сыр",
            description: "молочный"
        }
    };
    var stmt = db.prepare("INSERT INTO products (product) VALUES (?)");
    for (var i = 0; i < 10; i++) {
        testproduct.id = i,
        testproduct.product.name = "сыр " + (i + 1)
        //stmt.run(testproduct.id,JSON.stringify(testproduct.product));
        stmt.run(JSON.stringify(testproduct.product));
    }

    stmt.finalize();
}
function productGetCount(db, callback) {
    var data;
    db.each("SELECT count(id) as count FROM products", function (err, row) {
        data = row.count;
    }, function () {
        callback(data);
    });
}
function productGetById(db, id, callback) {
    var data;
    db.each("SELECT product FROM products WHERE id = " + id, function (err, row) {
        data = row;
    }, function () {
        callback(data);
    });
}

function productDel(db, id) {
    db
        .exec("delete FROM products where id = " + id, function (err, row) {})
}
function prepareDB(db, cb) {
    db.run("create table if not exists products (id INTEGER PRIMARY KEY AUTOINCREMENT,produc" +
            "t JSON)",
    cb);

}
function callbackInit(db) {
    productGetCount(db, function (data) {
        if (data == 0 || data == undefined) {
            console.log("пусто");
            productInitData(db);
        } else {
            console.log("есть данные");
        }
    });
}

function showData(db) {
    db
        .each("SELECT * FROM products order by id", function (err, row) {
            console.log(row.id + ": " + row.product);
        })
}

db
    .serialize(function () {
        prepareDB(db, () => {

            productInitData(db, () => {
                productGetCount(db, function (data) {
                    if (data == 0) {
                        console.log("нет записей");
                        // если нет записей хочу их добавить . внутри не работает
                        productInitData(db);
                    } else {
                        console.log("есть записи");
                    };
                });
                //showData(db); productDel(db,8); showData(db);
                productGetById(db, 5, function (data) {
                    console.log(data);
                }); // выводит 5-ю
                productGetCount(db, function (data) {
                    console.log(data);
                }); // выводит количество
            })
        })
    });

db.close();