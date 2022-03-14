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
// app.use(basicAuth({
//     usuario: 'test@koibanx.com', 
//     contraseña: 'test123'
// }));

//Routes
app.use(require('./routes/index'));

//Start the server
app.listen(app.get('port'), () => {
    console.log('Listening in port', app.get('port'));
});