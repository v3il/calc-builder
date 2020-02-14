const passport = require('passport');
const bcrypt = require('bcrypt');

const knexInstance = require('../knexInstance');

module.exports = app => {
    app.post('/login', passport.authenticate('local'), (request, response) => {
        response.status(200).json({
            status: 'Ok',
        });
    });

    app.post('/register', async (request, response) => {
        const { login, password } = request.body;

        if (!(login && login.length >= 4)) {
            return response.status(400).json({
                message: 'Login is too short',
            });
        }

        try {
            const usersWithSameLogin = await knexInstance('users')
                .where({ login })
                .select();

            if (usersWithSameLogin.length) {
                return response.status(400).json({
                    message: `User with login ${login} already exists`,
                });
            }
        } catch (error) {
            console.error(error);

            response.status(500).json({
                details: error.message,
            });
        }

        if (!(password && password.length >= 4)) {
            return response.status(400).json({
                message: 'Password is too short',
            });
        }

        const salt = bcrypt.genSalt(20);
        const encryptedPassword = bcrypt.hash(password, salt);

        try {
            const newUserIds = await knexInstance('users').insert({
                login,
                salt,
                password: encryptedPassword,
            });

            response.status(200).json({
                created: true,
                userId: newUserIds,
            });
        } catch (error) {
            console.error(error);

            response.status(500).json({
                details: error.message,
            });
        }
    });
};
