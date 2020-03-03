const HTTPErrors = require('http-custom-errors');
const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new HTTPErrors.ForbiddenError('Необходимо авторизоваться');
    }

    const token = authorization.split(' ')[1];

    try {
        request.user = jwt.verify(token, process.env.JWT_SECRET) || {};
        next();
    } catch (error) {
        throw new HTTPErrors.ForbiddenError('Необходимо авторизоваться');
    }
};
