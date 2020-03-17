const BaseService = require('./base');

class FormsService extends BaseService {
    constructor() {
        super('forms');
    }

    _getDefaultLayout() {
        return [{ fields: [] }];
    }

    getEmptyForm(userId) {
        return {
            name: 'Форма',
            layout: JSON.stringify(this._getDefaultLayout()),
            userid: userId,
        };
    }

    packForm(form) {
        form.layout = JSON.parse(form.layout || this._getDefaultLayout());
        return form;
    }

    unpackForm(form) {
        try {
            form.layout = JSON.parse(form.layout);
        } catch (e) {
            form.layout = this._getDefaultLayout();
        }

        return form;
    }
}

module.exports = new FormsService();
