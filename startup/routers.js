const bodyParser = require("body-parser");
const bill = require("../routes/bill");
const productType = require("../routes/productType");
const crawler = require("../routes/crawler");
const redisTest = require("../routes/redis/history");
const cronJob = require("../routes/remind/cron-job");
const customer = require("../routes/customer")
const configMenu = require("../routes/configMenu")
const configIconHeader = require("../routes/configIconHeader")
const product = require("../routes/product")
const chat = require("../routes/chat")
module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use("/api/bill",bill);
    app.use("/api/product-type",productType)
    app.use("/api/crawler",crawler);
    app.use("/api/redis/test",redisTest);
    app.use("/api/cron-job",cronJob);
    app.use("/api/customer",customer);
    app.use('/api/menu',configMenu);
    app.use('/api/product',product);
    app.use('/api/iconHeader',configIconHeader);
    app.use('/api/chat',chat);
}
