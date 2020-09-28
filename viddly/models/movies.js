const {Genre, validateGenre, genreSchema} = require('./genres');
const mongoose = require('mongoose');
const Joi = require('joi');
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    genre: genreSchema,
    
    numberInStock : Number,
    dailyRentalRate: Number
}));
function validateMovie(movie) {
    const schema = Joi.object({
            title:Joi.string().min(4).required(),
            genreId: Joi.objectId().required(),
            numberInStock: Joi.number().min(0).required(),
            dailyRentalRate: Joi.number().min(0).required(),
        });
    return schema.validate(movie);
}
exports.Movie = Movie;
exports.validateMovie = validateMovie;