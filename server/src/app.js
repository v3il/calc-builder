require('dotenv').config();

const express = require('express');
const boot = require('../boot');
const initRoutes = require('./routes');
const initPassport = require('./passport');

const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('passport');

const app = express();

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(cors());
app.use(require('cookie-parser')());
app.use(bodyParser.json('combine'));
app.use(
    require('express-session')({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(cors());
// app.use(bodyParser.json('combine'));

// boot(app);
initRoutes(app);
initPassport(app);

app.listen(process.env.PORT || 3000);
