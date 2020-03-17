const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const BaseService = require('./base');

class UsersService extends BaseService {
    constructor() {
        super('users');
    }

    comparePasswords(rawPassword, encryptedPassword) {
        return bcrypt.compare(rawPassword, encryptedPassword);
    }

    extractUserPublicData(user) {
        return { id: user.id, email: user.email };
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(3);
        return bcrypt.hashSync(password, salt);
    }

    generateTokenData(userPublicData) {
        const tokenDuration = 60 * 60 * 24 * 7;

        const expires = Math.floor(Date.now() / 1000 + tokenDuration);
        const token = jwt.sign(userPublicData, process.env.JWT_SECRET, {
            expiresIn: tokenDuration,
        });

        return { token, expires };
    }
}

module.exports = new UsersService();
