require('dotenv').config();

const { promisify } = require('util');

const express = require('express');
const expressSession = require('express-session');
const initRoutes = require('./routes');
const initPassport = require('./passport');

const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('passport');

const knexInstance = require('./knexInstance');

const app = express();

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(cors());
app.use(require('cookie-parser')());
app.use(bodyParser.json('combine'));

var KnexSessionStore = require('connect-session-knex')(expressSession);
var store = new KnexSessionStore({
    knex: knexInstance,
});

// app.configure(function() {
    app.use(
        expressSession({
            store: store,
            secret: 'your secret',
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
        }),
    );
// });

passport.serializeUser((user, done) => {
    console.log('S', user);

    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('D', id);

    try {
        done(
            null,
            await knexInstance('users')
                .where({ id })
                .select(),
        );
    } catch (err) {
        done(err);
    }
});

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.user)

    // If user is disabled, redirect him to login form
    if (req.user) {
        req.session.destroy();
        req.logout();

        // if (req.method === 'POST') {
        //     // If it is a POST request (API), send the 301th status
        //     // to redirect user in JS
        //     res.sendStatus(301);
        // } else {
        //     // If GET request, redirect user on server
        //     res.redirect('/');
        // }
    } else {
        // req.loginAsync = promisify(req.login);
        next();
    }
});

initRoutes(app);
initPassport(app);

app.listen(process.env.PORT || 3000);
