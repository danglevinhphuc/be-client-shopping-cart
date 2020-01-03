const redis = require("redis");
const router = require("express").Router();
// const client = redis.createClient(process.env.REDIS);
const axios = require("axios");
const {History} = require("../../models/history");
const initQuery = require('../../helpers/initQuery');
const md5 = require("md5");
// client.on("error", err => {
//   console.log("Error " + err);
// });

router.post("/history", async (req, res) => {
  // key to store results in Redis store
  const inputs  = initQuery(req.body);

  const photosRedisKey = md5(inputs);
  // Try fetching the result from Redis first in case we have it cached
  return client.get(photosRedisKey, async (err, photos) => {
    // If that key exists in Redis store
    if (photos) {
      return res.json({ source: "cache", data: JSON.parse(photos) });
    } else {
      // Key does not exist in Redis store

      // Fetch directly from remote api      
      var data = await History.find({});
      // client.set(photosRedisKey, JSON.stringify(data));
      return res.json({ source: "api",  data });
    }
  });
});
router.delete("/history", async (req, res) => {
  // key to store results in Redis store
  const photosRedisKey = "user:photos";

  // Try fetching the result from Redis first in case we have it cached
  client.del(photosRedisKey, function(err, reply) {
    if (!err) {
      if (reply === 1) {
        console.log("Key is deleted");
      } else {
        console.log("Does't exists");
      }
    }
  });
  return res.json();
});
module.exports = router;
