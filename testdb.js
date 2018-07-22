var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/db1.db');
// http://www.sqlitetutorial.net/sqlite-nodejs/query/ 

function prepareDB(db){
    db.run ("create table if not exists products (id NUMBER,product JSON)");
    var count = 0;
    db.each("SELECT count(id) as count FROM products", function(err, row) {count = row.count});
    if (count >= 0) {
        var stmt = db.prepare("INSERT INTO products VALUES (?,?)");
        for (var i = 0; i < 10; i++) {
            testproduct.id=i,testproduct.product.name="сыр " + i
            stmt.run(testproduct.id,JSON.stringify(testproduct.product));
        }
        stmt.finalize();
    }    
}
function showData(db){
    db.each("SELECT * FROM products order by id", function(err, row) {
        console.log(row.id + ": " + row.product);
    })
}
var testproduct ={id:1,product:{name:"сыр",description:"молочный"}};
db.serialize(function() {
    prepareDB(db);
    showData(db)
 });


console.log(testproduct); 
db.close();