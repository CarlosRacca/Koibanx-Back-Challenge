require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth')

//Initializations
const app = express();
require('./database');

//Settings
app.set('port', 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(basicAuth({
    users: { 'test@koibanx.com': 'test123' }
}));

//Routes
app.use(require('./routes/index'));

//Start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

module.exports = app