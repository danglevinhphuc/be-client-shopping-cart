const getToken3th = require("../helpers/getToken3th");
const _ = require("lodash");
const axios = require("axios");

var router = require("express").Router();
var auth = getToken3th();
router.post("/get", async (req, res) => {
  try {
    var data = await axios.post(
      `${auth.url}/api/menu/get-all`,
      {},
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
router.post("/update-position", async (req, res) => {
  try {
    var data = await axios.post(
      `${auth.url}/api/menu/update-position`,
      req.body,
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
