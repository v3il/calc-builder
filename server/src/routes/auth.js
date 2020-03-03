const HTTPErrors = require('http-custom-errors');

const { OAuth2Client } = require('google-auth-library');

const { usersService } = require('../service');

module.exports = app => {
    app.post('/login', login);
    app.post('/register', register);
    app.post('/logout', logout);

    app.post('/login/google', loginGoogle);
};

async function login(request, response) {
    const { email, password } = request.body;

    if (!email) {
        throw new HTTPErrors.BadRequestError('Не задан логин');
    }

    if (!password) {
        throw new HTTPErrors.BadRequestError('Не задан пароль');
    }

    const users = await usersService.find({ email });

    if (!users.length) {
        throw new HTTPErrors.BadRequestError('Неправильный логин');
    }

    const user = users[0];
    const isValidPassword = await usersService.comparePasswords(password, user.password);

    if (!isValidPassword) {
        throw new HTTPErrors.BadRequestError('Неправильный пароль');
    }

    const userPublicData = usersService.extractUserPublicData(user);

    response.json({
        token: usersService.generateToken(userPublicData),
        user: userPublicData,
    });
}

async function register(request, response) {
    const { email, password } = request.body;

    if (!(email && email.trim().length > 0)) {
        throw new HTTPErrors.BadRequestError('Не задан логин');
    }

    if (!(password && password.trim().length > 4)) {
        throw new HTTPErrors.BadRequestError('Не задан пароль');
    }

    const usersWithSameLogin = await usersService.find({ email });

    if (usersWithSameLogin.length) {
        throw new HTTPErrors.BadRequestError(`Пользователь с почтой "${email}" уже существует`);
    }

    const encryptedPassword = await usersService.hashPassword(password);

    const user = await usersService.insertAndReturn({
        email,
        password: encryptedPassword,
    });

    const userPublicData = usersService.extractUserPublicData(user);

    response.json({
        token: usersService.generateToken(userPublicData),
        user: userPublicData,
    });
}

async function logout(request, response) {
    response.json({ success: true });
}

async function loginGoogle(request, response) {
    const { token } = request.body;

    if (!token) {
        throw new HTTPErrors.BadRequestError('Не задан token');
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
    });

    const { sub: userId, email } = ticket.getPayload();

    const usersByGoogleUserId = await usersService.find({ googleId: userId });

    let user;

    if (usersByGoogleUserId.length) {
        user = usersByGoogleUserId[0];
    } else {
        const insertedUsers = await usersService.insertAndReturn({
            email,
            googleId: userId,
        });

        user = insertedUsers[0];
    }

    const userPublicData = usersService.extractUserPublicData(user);

    response.json({
        token: usersService.generateToken(userPublicData),
        user: userPublicData,
    });
}
