const HTTPErrors = require('http-custom-errors');

const axios = require('axios');
const querystring = require('querystring');

const { OAuth2Client } = require('google-auth-library');

const { usersService } = require('../service');

module.exports = app => {
    app.post('/register', register);

    app.post('/login/local', loginLocal);
    app.post('/login/google', loginGoogle);
    app.post('/login/facebook', loginFacebook);

    const clientId = '';
    const clientSecret = '';
    const redirect = 'https://localhost:3000/login/instagram/callback';

    app.get('/login/instagram', function (request, response) {
        response.redirect(
            `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}&scope=user_profile,user_media&response_type=code`,
        );
    });

    app.get('/login/instagram/callback', async (request, response) => {
        // console.log(request.query);

        const d = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: redirect,
            code: request.query.code,
        };

        // console.log(d)

        try {
            const r = await axios.post(
                'https://api.instagram.com/oauth/access_token',
                querystring.stringify(d),
            );

            console.log(r.data);

            const userId = r.data.user_id;
            const token = r.data.access_token;

            console.log(userId, token)
            console.log(`https://graph.instagram.com/${userId}?fields=id,username&access_token=${token}`)

            const r2 = await axios.get(
                `https://graph.instagram.com/me?fields=id,username,email&access_token=${token}`,
            );

            console.log(r2.data);
        } catch (e) {
            console.log(e)
        }

        response.redirect('http://localhost:8080/login');
    });
};

async function loginLocal(request, response) {
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
        tokenData: usersService.generateTokenData(userPublicData),
        userData: userPublicData,
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

    const createdUsers = await usersService.insertAndReturn({
        email,
        password: encryptedPassword,
    });

    const userPublicData = usersService.extractUserPublicData(createdUsers[0]);

    response.json({
        tokenData: usersService.generateTokenData(userPublicData),
        userData: userPublicData,
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
        tokenData: usersService.generateTokenData(userPublicData),
        userData: userPublicData,
    });
}

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
        tokenData: usersService.generateTokenData(userPublicData),
        userData: userPublicData,
    });
}
