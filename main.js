const Products = require('./src/database').Product;

Products.initExampleData((err) => {console.log("Заполнили данные")});
Products.all((err,products) => {
    if (err) return next(err);
    console.log(products);
});