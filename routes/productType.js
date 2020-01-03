const getToken3th = require("../helpers/getToken3th");
const authSync = require("../middleware/authSync");
const _ = require("lodash");
const axios = require("axios");

var router = require("express").Router();
var auth = getToken3th();
router.post("/create", authSync, async (req, res) => {
  try {
    var data = await axios.post(`${auth.url}/api/product-type/edit`, req.body, {
      headers: {
        Authorization: auth.token,
        username: auth.username
      }
    });
    if (!data) {
      return res.status(400).send(`Bad request record ${req.body}`);
    }
    return res.send(data.data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
router.post("/get", async (req, res) => {
  try {
    var data = await axios.post(
      `${auth.url}/api/product-type/query`,
      req.body.query,
      {
        headers: {
          Authorization: req.body.token,
          username: req.body.username
        }
      }
    );
    if (!data) {
      return res.status(400).send(`Bad request record`);
    }
    return res.send(data.data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
module.exports = router;
