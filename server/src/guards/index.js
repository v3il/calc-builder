const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(403).json({
            error: 'Необходимо авторизоваться',
        });
    }

    const token = authorization.split(' ')[1];

    try {
        request.user = jwt.verify(token, process.env.JWT_SECRET) || {};
        next();
    } catch (error) {
        return response.status(403).json({
            error: 'Необходимо авторизоваться',
        });
    }
};
