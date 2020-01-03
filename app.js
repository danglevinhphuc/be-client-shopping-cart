const axios = require("axios");
const config = require("config");
const express = require("express");
const cors = require("cors");
const logger = require("./startup/logging");
const app = express();
app.use(cors());
require("dotenv").config({ path: __dirname + "/.env" });

const port = process.env.PORT || 7000;
require("./startup/db")(config);
require("./startup/routers")(app);
app.listen(port, () => {
  logger.info(`connected : ${port}`);
});

const actionBE = async () => {
  var response = await axios.post(
    "https://api-dev-shopping.herokuapp.com/api/auth/signin",
    { username: "123123", password: "321321" }
  );
};
setInterval(function() {
  console.log("Connecting");
  actionBE();
}, 60000);
