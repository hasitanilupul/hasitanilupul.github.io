require('./config/config');
require('./models/db');
require('./config/passportConfig');



const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');


const rtsIndex = require('./routes/index.router');

var app = express();


// app.use(cors({ origin: 'http://localhost:4200'}));



// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use('/', rtsIndex);
app.use('/public', express.static('public'));



// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));


