const express = require('express');
const router = express.Router();
const {Customer, validateCustomer} = require('../models/customers');
router.get('',async (req, res) => {
    try {
        const customers = await Customer.find();
        res.send(customers);
    }
    catch(err) {
        res.send(err.message)
    }

});
router.post('', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    let customer = new Customer({
        name:req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone,
    });
    customer = await customer.save();
    res.send(customer);
});
router.put('/:id', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name:req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone,
    }, {new: true});
    if(!customer){res.status(404).send('Not found');}
    res.send(customer);
});
router.delete('/:id',async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer){
        res.status(404).send('Not found');
    }
    res.send(customer);
});
router.get('/:id',async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(404).send('Not found');
    }
    res.send(customer);
});

module.exports = router;