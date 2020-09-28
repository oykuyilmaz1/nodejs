const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {User} = require('../models/users');
const bcrypt = require('bcrypt');
const config = require('config');
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
    if(!user) return res.status(400).send('No match');
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword) return res.status(400).send('No match');
    const token = jwt.sign({_id:user._id}, config.get('jwtPrivateKey'));
    res.send(token);
    // res.send(_.pick(['_id', 'name', 'email']));
});
function validateUser(req) {
    const schema = Joi.object(
        {
            email:Joi.string().min(5).max(255).required().email(),
            password:Joi.string().min(5).max(255).required(),

        }
        );
    return schema.validate(req);
}
module.exports = router;
// joi-password-complexity