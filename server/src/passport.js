const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const knexInstance = require('./knexInstance');

module.exports = () => {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'login',
                passwordField: 'password',
            },
            async function(login, password, done) {
                console.log(login, password)

                try {
                    const users = await knexInstance('users')
                        .where({ login })
                        .select();

                    console.log(users[0])

                    if (!users.length) {
                        return done(null, false);
                    }

                    return done(null, users[0]);
                } catch (error) {
                    done(error);
                }
            },
        ),
    );
};