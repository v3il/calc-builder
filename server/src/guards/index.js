const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(403);
    }

    const token = authorization.split(' ')[1];

    try {
        request.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return response.status(403);
    }

    next();
};
