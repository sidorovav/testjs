//смотреть здесь:
// http://www.sqlitetutorial.net/sqlite-nodejs/query/
const sqlite3 = require('sqlite3').verbose();
const dbName ='./DB/db1.db';
const db = new sqlite3.Database(dbName);
db.serialize(() => {
const sql = 'create table if not exists ' + 
'products (id INTEGER PRIMARY KEY AUTOINCREMENT,product JSON)';    
    db.run(sql);
});

class Product {
    static all(cb) {
        const prototype='products'
        db.all('select * from ' +prototype,cb);
    }
    static find(id,cb) {
        const prototype='products'
        db.get('select * from ' +prototype + ' WHERE id = ?',id,cb);
    }
    static create(data,cb) {
        const sql = 'INSERT INTO ' +prototype + '(product) VALUES (?)';
        db.run(sql,JSON.stringify(data),cb);
    }
    static delete(id,cb) {
        if (!id) return cb(new Error('Введите ID'));
        const sql = 'DELETE FROM ' +prototype + 'WHERE id = ?';
        db.run(sql,id,cb);
    }
    static initExampleData(cb){
        var testproduct = {
            id: 1,
            product: {
                name: "сыр",
                description: "молочный"
            }
        };
        var stmt = db.prepare('INSERT INTO products (product) VALUES (?)');
        for (var i = 0; i < 10; i++) {
        testproduct.id = i,
        testproduct.product.name = "сыр " + (i + 1);
        stmt.run(JSON.stringify(testproduct.product),cb);
        }
        stmt.finalize(cb);
    }
}

module.exports = db;
module.exports.Product = Product;