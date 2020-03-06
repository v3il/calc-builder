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

    async insertAndReturn(data) {
        const ids = await this.knex().insert(data);
        return this.find({ id: ids[0] });
    }
};
