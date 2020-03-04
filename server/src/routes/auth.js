const HTTPErrors = require('http-custom-errors');

const { OAuth2Client } = require('google-auth-library');

const { usersService } = require('../service');

module.exports = app => {
    app.post('/login', login);
    app.post('/register', register);

    app.post('/login/google', loginGoogle);
    app.post('/login/facebook', loginFacebook);
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

const axios = require('axios');

async function loginFacebook(request, response) {
    const { accessToken, userId } = request.body;

    if (!accessToken) {
        throw new HTTPErrors.BadRequestError('Не задан accessToken');
    }

    if (!userId) {
        throw new HTTPErrors.BadRequestError('Не задан userId');
    }

    const url = `https://graph.facebook.com/v2.6/${userId}?fields=email&access_token=${accessToken}`;

    const fbResponse = await axios.get(url);
    const { email, id } = fbResponse.data;

    const usersByFacebookUserId = await usersService.find({ facebookId: id });

    let user;

    if (usersByFacebookUserId.length) {
        user = usersByFacebookUserId[0];
    } else {
        const insertedUsers = await usersService.insertAndReturn({
            email,
            facebookId: id,
        });

        user = insertedUsers[0];
    }

    const userPublicData = usersService.extractUserPublicData(user);

    response.json({
        token: usersService.generateToken(userPublicData),
        user: userPublicData,
    });
}
