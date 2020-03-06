const BaseService = require('./base');

class FormsService extends BaseService {
    constructor() {
        super('forms');
    }
}

module.exports = new FormsService();
