const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const knexInstance = require('../knexInstance');

module.exports = app => {
    app.post('/login', async (request, response) => {
        const { login, password } = request.body;

        if (!(login && login.length >= 4)) {
            return response.status(400).json({
                error: 'Логин не может быть меньше, чем 4 символа',
            });
        }

        if (!(password && password.length >= 6)) {
            return response.status(400).json({
                error: 'Пароль не может быть меньше, чем 6 символов',
            });
        }

        try {
            const users = await knexInstance('users')
                .where({ login })
                .select();

            if (!users.length) {
                return response.status(400).json({
                    error: 'Неправильный логин',
                });
            }

            const user = users[0];

            const salt = await bcrypt.genSalt(3);
            const encryptedPassword = await bcrypt.hashSync(password, salt);

            if (user.password !== encryptedPassword) {
                return response.status(400).json({
                    error: 'Неправильный пароль',
                });
            }

            const userPublicData = { id: user.id, login: user.login };

            const token = jwt.sign(userPublicData, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_DURATION,
            });

            response.status(200).json({
                token,
                user: userPublicData,
            });
        } catch (error) {
            console.error(error);

            response.status(500).json({
                error: error.message,
            });
        }
    });

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

            const createdUsers = await knexInstance('users')
                .where({
                    id: newUserIds[0],
                })
                .select();

            console.log(createdUsers[0]);

            // const token = jwt.sign({ id: createdUsers[0].id, login: createdUsers[0].login }, process.env.JWT_SECRET, {
            //     expiresIn: '7d',
            // });
            //
            // console.log(request.cookies)
            //
            // response.cookie('jwt_token', token, {
            //     httpOnly: false,
            //     maxAge: 900000,
            // });
            //
            // console.log(token)

            response.status(200).json({
                // token,
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
