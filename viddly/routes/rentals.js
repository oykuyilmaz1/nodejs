const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Movie} = require('../models/movies');
const { Genre } = require('../models/genres');
const Fawn = require('fawn');
const {Rental, validateRental} = require('../models/rentals');
const { Customer } = require('../models/customers');

Fawn.init(mongoose);
router.get('',async (req, res) => {
    try {
        const rentals = await Rental.find().sort('-dateOut');
        res.send(rentals);
    }
    catch(err) {
        res.send(err.message)
    }

});
router.post('', async (req, res) => {
    const {error} = validateRental(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const customer = await Customer.findById(req.body.customerId);
    const movie = await Movie.findById(req.body.movieId);
    if(!customer ) return res.status(400).send('Invalid Customer');
    if(!movie ) return res.status(400).send('Invalid Movie');

    if(movie.numberInStock == 0) return res.status(400).send('Movie not in the stock')
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name:customer.name,
            phone: customer.phone
        },
        movie: {
            _id:movie._id,
            title:movie.title,
            dailyRentalRate: movie.title
        },

    });
    // rental = await rental.save();

    // movie.numberInStock--;
    // await movie.save();
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id:movie._id}, {
                $inc: {numberInStock: -1}
            })
            .run();
        res.send(rental);
    }
    catch(ex){
        res.status(500).send('Something failed');
    }
    // res.send(rental);
});
router.put('/:id', async (req, res) => {
    const {error} = validateMovie(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title:req.body.title,
        genre: {
            _id:genre._id,
            name:genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {new: true});
    if(!movie){res.status(404).send('Not found');}
    res.send(movie);
});
router.delete('/:id',async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie){
        res.status(404).send('Not found');
    }
    res.send(movie);
});
router.get('/:id',async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        res.status(404).send('Not found');
    }
    res.send(movie);
});

module.exports = router;