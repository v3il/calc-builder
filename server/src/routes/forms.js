const HTTPErrors = require('http-custom-errors');

const authGuard = require('../guards');

const { formsService } = require('../service');

const DEFAULT_LAYOUT = [{ fields: [] }];

module.exports = app => {
    app.get('/forms', authGuard, async (request, response) => {
        const { id } = request.user;
        const forms = await formsService.find({ userid: id });

        const processedForms = forms.map(form => {
            try {
                form.layout = JSON.parse(form.layout);
            } catch (e) {
                form.layout = DEFAULT_LAYOUT;
            }

           console.log(form.layout)

            return form
        });

        response.json(processedForms);
    });

    app.get('/forms/:id', authGuard, async (request, response) => {
        const { id: userId } = request.user;
        const { id: formId } = request.params;
        const form = await formsService.findOne({ userid: userId, id: formId });

        if (!form) {
            throw HTTPErrors.BadRequest('Форма не пренадлежит вам!');
        }

        try {
            form.layout = JSON.parse(form.layout);
        } catch (e) {
            form.layout = DEFAULT_LAYOUT;
        }

        response.json(form);
    });

    app.post('/forms/create', authGuard, async (request, response) => {
        const { id } = request.user;

        const form = {
            name: 'Форма',
            layout: JSON.stringify(DEFAULT_LAYOUT),
            userid: id,
        };

        const insertedForms = await formsService.insertAndReturn(form);

        response.json({
            form: insertedForms[0],
        });
    });

    app.delete('/forms/:id', authGuard, async (request, response) => {
        const { id: userId } = request.user;
        const { id: formId } = request.params;

        const formToRemove = await formsService.findOne({
            id: formId,
            userid: userId,
        });

        if (!formToRemove) {
            throw HTTPErrors.BadRequest('Форма не пренадлежит вам!');
        }

        const removed = await formsService.remove({ id: formId });

        response.json({ removed });
    });
};
