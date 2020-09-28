const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validateUser} = require('../models/users');
const bcrypt = require('bcrypt');

router.get('',async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch(err) {
        res.send(err.message)
    }

});
router.post('', async (req, res) => {
    const {error} = validateUser(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('User already exists');
    user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(user);
    // res.send(_.pick(['_id', 'name', 'email']));
});

module.exports = router;
// joi-password-complexity