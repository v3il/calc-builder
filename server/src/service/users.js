const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const knexInstance = require('../knexInstance');

class UsersService {
    find(where) {
        return knexInstance('users')
            .where(where)
            .select();
    }

    async insertAndReturn(user) {
        const newUserIds = await knexInstance('users').insert(user);
        return this.find({ id: newUserIds[0] });
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

    generateToken(userPublicData) {
        return jwt.sign(userPublicData, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_DURATION,
        });
    }
}

module.exports = new UsersService();
