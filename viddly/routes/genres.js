const express = require('express');
const router = express.Router();
const {Genre, validateGenre} = require('../models/genres');

router.get('',async (req, res) => {
    try {
        const genres = await Genre.find();
        res.send(genres);
    }
    catch(err) {
        res.send(err.message)
    }

});
router.post('', async (req, res) => {
    const {error} = validateGenre(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    let genre = new Genre({
        name:req.body.name
    });
    genre = await genre.save();
    res.send(genre);
});
router.put('/:id', async (req, res) => {
    const {error} = validateGenre(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, {new: true});
    if(!genre){res.status(404).send('Not found');}
    res.send(genre);
});
router.delete('/:id',async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if(!genre){
        res.status(404).send('Not found');
    }
    res.send(genre);
});
router.get('/:id',async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre){
        res.status(404).send('Not found');
    }
    res.send(genre);
});

module.exports = router;