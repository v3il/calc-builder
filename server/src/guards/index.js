const expressJWT = require('express-jwt');

module.exports = expressJWT({
    secret: process.env.JWT_SECRET,
});
