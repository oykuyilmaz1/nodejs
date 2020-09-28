const startUpDebugger = require('debug');
const express = require('express');
const config = require('config');
const { response } = require('express');
const app = express();
const Joi = require('joi');
const logger = require('./middleware/logger');
const { array } = require('joi');
const courses  = require('./routes/courses');
const home  = require('./routes/home');
// app.get();
// app.post();
// app.delete();
// app.put();
app.use(express.json()); // req.body
app.use(express.static('public'));
app.use(logger);
app.use('/api/courses', courses);
app.use('/', home);

app.set('view engine', 'pug');
app.set('views','./views');
// console.log(`Name: ${app.get('app_password')}`);
// console.log(`Name: ${config.get('mail.password')}`);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});