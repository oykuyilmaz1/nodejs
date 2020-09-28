const Joi = require('joi');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    isGold: {
        type:Boolean,
        default: false
    },
    phone : {
        type:String,
        required:true
    }
}));
function validateCustomer(customer) {
    const schema = Joi.object(
        {
            name:Joi.string().min(3).max(50).required(),
            isGold:Joi.boolean(),
            phone:Joi.string().min(5).max(50).required(),

        }
        );
    return schema.validate(customer);
}
module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;