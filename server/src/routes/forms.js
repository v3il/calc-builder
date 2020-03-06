const authGuard = require('../guards');

const { formsService } = require('../service');

module.exports = app => {
    app.get('/forms', authGuard, async (request, response) => {
        const { id } = request.user;
        const forms = await formsService.find({ userid: id });

        response.json(forms);
    });

    app.post('/forms/create', authGuard, async (request, response) => {
        const { id } = request.user;

        const form = {
            name: 'Форма',
            layout: [{ fields: [] }],
            userid: id,
        };

        const insertedForms = await formsService.insertAndReturn(form);

        response.json({
            form: insertedForms[0],
        });
    });
};
