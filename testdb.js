var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/db1.db');
// http://www.sqlitetutorial.net/sqlite-nodejs/query/ 
/*
db.serialize(function() {
  //db.run("CREATE TABLE lorem (info TEXT)");
 
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
 
  db.each("SELECT rowid AS id, info FROM lorem order by info", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});
*/
var testproduct ={id:1,product:{name:"сыр",description:"молочный"}};
db.serialize(function() {
    db.run ("create table if not exists products (id NUMBER,product JSON)");
    var stmt = db.prepare("INSERT INTO products VALUES (?,?)");
        for (var i = 0; i < 10; i++) {
            testproduct.id=i,testproduct.product.name="сыр " + i
            stmt.run(testproduct.id,JSON.stringify(testproduct.product));
        }
        stmt.finalize();
 });

console.log(testproduct); 
db.close();