const knexInstance = require('../knexInstance');

module.exports = class BaseService {
    constructor(tableName) {
        this.tableName = tableName;
    }

    knex() {
        return knexInstance(this.tableName);
    }

    find(where) {
        return this.knex()
            .where(where)
            .select();
    }

    async findOne(where) {
        const rows = await this.find(where);
        return rows[0];
    }

    async insertAndReturn(data) {
        const ids = await this.knex().insert(data);
        return this.find({ id: ids[0] });
    }

    async update(where, data) {
        return this.knex()
            .where(where)
            .update(data);
    }

    async remove(where) {
        return this.knex().where(where).del();
    }
};
