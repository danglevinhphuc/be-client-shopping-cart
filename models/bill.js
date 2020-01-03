const mongoose = require("mongoose");
const Joi = require("joi");
const Bill = mongoose.model(
    "Bill",
    new mongoose.Schema({
      products:{type : Array, required: true, default: []},
      phone: {type: String, required: true},
      email: {type:String},
      status:{type: String,default: "waiting",required: true}
    },
    {
      timestamps: true
    })
);
function validateBill(bill){
    const schema = {
        products:Joi.required(),
        phone: Joi.string()
        .min(5)
        .max(50)
        .required(),
        email: Joi.string()
        .email()
    }
    return Joi.validate(bill,schema)
}
module.exports = {
    Bill,
    validateBill
}