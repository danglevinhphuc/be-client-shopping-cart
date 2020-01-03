const { Bill, validateBill: validate } = require("../models/bill");
const initQuery = require("../helpers/initQuery");
const _ = require("lodash");
const md5 = require("md5");
const redis = require("redis");
const router = require("express").Router();
const client = redis.createClient({host: process.env.HOST_REDIS,port: process.env.PORT_REDIS,password: process.env.PASS_REDIS});
const nameRedis = "bills";
// get By Id
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.send(404);
    }
    return res.send(bill);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// edit
router.post("/edit", async (req, res) => {
  try {
    var bill = null;
    if (req.body.id) {
      bill = await Bill.findByIdAndUpdate(
        req.body.id,
        {
          products: req.body.products,
          status: req.body.status
        },
        { new: true }
      );
    } else {
      const { error } = validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      bill = await new Bill({
        products: req.body.products,
        phone: req.body.phone,
        email: req.body.email,
        status: "wating"
      }).save();
    }
    await client.del(nameRedis, function(err, reply) {});
    return res.send(bill);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
// delete
router.post("/delete/:id", async (req, res) => {
  try {
    bill = await Bill.findByIdAndUpdate(
      req.params.id,
      {
        status: "remove"
      },
      { new: true }
    );
    await client.del(nameRedis, function(err, reply) {});
    return res.send(bill);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
// query
router.post("/query", async (req, res) => {
  try {
    var inputs = initQuery(req.body);
    const md5Query = md5(JSON.stringify(inputs));
    return client.get(nameRedis, async (err, object) => {
      // If that key exists in Redis store
      if (err) {
        return res.status(500).send("Redis disconnected");
      }
      if (object) {
        var objectRedis = JSON.parse(object);
        if (objectRedis.md5Query == md5Query) {
          return res.json({ data: objectRedis.data });
        } else {
          await client.del(nameRedis, function(err, reply) {});
          client.set(nameRedis, JSON.stringify({ data: await queryBill(inputs), md5Query }));
          return res.send({ data: await queryBill(inputs) });
        }
      } else {
        client.set(nameRedis, JSON.stringify({ data: await queryBill(inputs), md5Query }));
        return res.send({ data: await queryBill(inputs) });
      }
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
const queryBill = async inputs => {
  var data = await Bill.find(inputs.query)
    .limit(inputs.size)
    .skip(inputs.from)
    .sort(inputs.sort);
  var output = {
    from: inputs.from,
    size: inputs.size,
    data,
    total: await Bill.find(inputs.query).count()
  };
  return output;
};
module.exports = router;
