const passport = require('passport');
const bcrypt = require('bcrypt');

const knexInstance = require('../knexInstance');

module.exports = app => {
    app.post(
        '/login',
        (request, response, next) => {
            passport.authenticate('local', (error, user) => {
                if (error) {
                    return response.status(500).json({
                        error: error.message,
                    });
                }

                if (!user) {
                    return response.status(500).json({
                        error: error.message,
                    });
                }

                request.logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    }

                    return response.redirect('/users/' + user.username);
                });
            })(request, response, next);
        },
        (request, response) => {
            response.status(200).json({
                status: 'Ok',
            });
        },
    );

    app.post('/register', async (request, response) => {
        const { login, password } = request.body;

        if (!(login && login.length >= 4)) {
            return response.status(400).json({
                error: 'Логин не может быть меньше, чем 4 символа',
            });
        }

        try {
            const usersWithSameLogin = await knexInstance('users')
                .where({ login })
                .select();

            if (usersWithSameLogin.length) {
                return response.status(400).json({
                    error: `Пользователь с логином "${login}" уже существует`,
                });
            }
        } catch (error) {
            console.error(error);

            response.status(500).json({
                error: error.message,
            });
        }

        if (!(password && password.length >= 4)) {
            return response.status(400).json({
                error: 'Пароль не может быть меньше, чем 4 символа',
            });
        }

        try {
            const salt = await bcrypt.genSalt(3);
            const encryptedPassword = await bcrypt.hashSync(password, salt);

            const newUserIds = await knexInstance('users').insert({
                login,
                password: encryptedPassword,
            });

            response.status(200).json({
                created: true,
                userId: newUserIds[0],
            });
        } catch (error) {
            console.error(error);

            response.status(500).json({
                error: error.message,
            });
        }
    });
};
