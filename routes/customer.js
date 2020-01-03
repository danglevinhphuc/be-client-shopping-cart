const { Customer, validateCustomer: validate } = require("../models/customer");
const secret = "webshoppingcart";
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.post("/sign-up", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    var hashPassword = bcrypt.hashSync(req.body.password, 8);
    var customerRes = await Customer.create({
      email: req.body.email,
      password: hashPassword,
      fullName: req.body.fullName,
      phone: req.body.phone,
      address: req.body.address
    });
    var token = verifyToken(customerRes);
    // get token
    return res.send({ success: true, token: token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    var customerRes = await Customer.findOne({ email: req.body.email });
    if (!customerRes) {
      return res.status(404).send("Account not exited");
    }
    var passwordIsValid = bcrypt.compareSync(req.body.password, customerRes.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false });
    var token = jwt.sign({ id: customerRes._id }, secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    return res.send({ success: true, token: token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

function verifyToken(data) {
  return jwt.sign({ id: data._id }, secret, {
    expiresIn: 86400 // expires in 24 hours
  });
}

module.exports = router;
