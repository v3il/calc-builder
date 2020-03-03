const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { OAuth2Client } = require('google-auth-library');

const knexInstance = require('../knexInstance');

module.exports = app => {
    app.post('/login', login);
    app.post('/register', register);
    app.post('/logout', logout);

    app.post('/login/google', loginGoogle);
};

async function login(request, response) {
    const { login, password } = request.body;

    if (!login) {
        return response.status(400).json({ error: 'Неправильный логин' });
    }

    if (!password) {
        return response.status(400).json({ error: 'Неправильный пароль' });
    }

    try {
        const users = await knexInstance('users')
            .where({ login })
            .select();

        if (!users.length) {
            return response.status(400).json({ error: 'Неправильный логин' });
        }

        const user = users[0];
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return response.status(400).json({ error: 'Неправильный пароль' });
        }

        const userPublicData = { id: user.id, login: user.login };

        const token = jwt.sign(userPublicData, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_DURATION,
        });

        response.json({ token });
    } catch (error) {
        console.error(error);

        response.status(500).json({
            error: error.message,
        });
    }
}

async function register(request, response) {
    const { login, password } = request.body;

    if (!(login && login.trim().length > 0)) {
        return response.status(400).json({ error: 'Неправильный логин' });
    }

    if (!(password && password.trim().length > 4)) {
        return response.status(400).json({ error: 'Неправильный пароль' });
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

        const salt = await bcrypt.genSalt(3);
        const encryptedPassword = await bcrypt.hashSync(password, salt);

        const newUserIds = await knexInstance('users').insert({
            login,
            password: encryptedPassword,
        });

        const createdUsers = await knexInstance('users')
            .where({ id: newUserIds[0] })
            .select();

        const user = createdUsers[0];
        const userPublicData = { id: user.id, login: user.login };

        const token = jwt.sign(userPublicData, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_DURATION,
        });

        response.json({ token });
    } catch (error) {
        console.error(error);

        response.status(500).json({
            error: error.message,
        });
    }
}

async function logout(request, response) {
    response.json({ success: true });
}

async function loginGoogle(request, response) {
    const { token } = request.body;

    if (!token) {
        response.status(400).json({
            error: 'Не указан id_token',
        });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });

        const payload = ticket.getPayload();

        const userId = payload.sub;
        const email = payload.email;

        const usersByGoogleUserId = await knexInstance('users')
            .where({ google_id: userId })
            .select();

        let user;

        if (usersByGoogleUserId.length) {
            user = usersByGoogleUserId[0];
        } else {
            const ids = await knexInstance('users').insert({
                email,
                login: '',
                password: '',
                google_id: userId,
            });

            const insertedUsers = await knexInstance('users')
                .where({ id: ids[0] })
                .select();

            user = insertedUsers[0];
        }

        const userPublicData = { id: user.id, login: user.email };

        const jwtToken = jwt.sign(userPublicData, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_DURATION,
        });

        response.json({ token: jwtToken });
    } catch (error) {
        console.error(error);

        response.status(500).json({
            error: error.message,
        });
    }
}
