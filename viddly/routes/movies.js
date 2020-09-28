const express = require('express');
const router = express.Router();
const {Movie, validateMovie} = require('../models/movies');
const { Genre } = require('../models/genres');

router.get('',async (req, res) => {
    try {
        const movies = await Movie.find();
        res.send(movies);
    }
    catch(err) {
        res.send(err.message)
    }

});
router.post('', async (req, res) => {
    const {error} = validateMovie(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const genre = await Genre.findById(req.body.genreId);
   
    if(!genre) return res.status(400).send('Invalid Genre');
    let movie = new Movie({
        title:req.body.title,
        genre: {
            _id:genre._id,
            name:genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
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