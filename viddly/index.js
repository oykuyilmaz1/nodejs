const express = require('express');
const config = require('config');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
console.log(config.get('jwtPrivateKey'));
if(!config.get('jwtPrivateKey')){
    console.error("Fatal error");
    process.exit(1);
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('Connected'))
    .catch((err) => console.error('Could not connect', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

mongoose.set('useCreateIndex', true);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});