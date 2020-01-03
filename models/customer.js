const mongoose = require("mongoose");
const Joi = require("joi");
const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
      email: {type: String, required: true,unique: true},
      password: {type:String, required: true},
      fullName: {type:String},
      phone: {type:String},
      address: {type:String},
    },
    {
      timestamps: true
    })
);
function validateCustomer(Customer){
    const schema = {
        email:Joi.string().email().required(),
        password: Joi.required()
    }
    return Joi.validate(Customer,schema)
}
module.exports = {
    Customer,
    validateCustomer
}