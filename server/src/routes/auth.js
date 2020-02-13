const passport = require('passport');

module.exports = app => {
    app.post('/login', passport.authenticate('local'), (request, response) => {
        response.status(200).json({
            status: 'Ok',
        });
    });
};
