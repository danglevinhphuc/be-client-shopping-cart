const getToken3th = require("../helpers/getToken3th");
const _ = require("lodash");
const axios = require("axios");

var router = require("express").Router();

router.post("/get", async (req, res) => {
  try {
    var auth = getToken3th();
    var data = await axios.post(
      `${auth.url}/api/product/query`,
      req.body.query,
      {
        headers: {
          Authorization: auth.token,
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
router.post("/group-with-type", async (req, res) => {
  try {
    var auth = getToken3th();
    var data = await axios.post(
      `${auth.url}/api/product/group-with-type`,
      req.body.query,
      {
        headers: {
          Authorization: auth.token,
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
