const HTTPErrors = require('http-custom-errors');

const authGuard = require('../guards');

const { formsService } = require('../service');

module.exports = app => {
    app.get('/forms', authGuard, async (request, response) => {
        const { id } = request.user;
        const forms = await formsService.find({ userid: id });

        const processedForms = forms.map(form => formsService.unpackForm(form));

        response.json(processedForms);
    });

    app.get('/forms/:id', authGuard, async (request, response) => {
        const { id: userId } = request.user;
        const { id: formId } = request.params;
        const form = await formsService.findOne({ userid: userId, id: formId });

        if (!form) {
            throw HTTPErrors.BadRequest('Форма не пренадлежит вам!');
        }

        response.json(formsService.unpackForm(form));
    });

    app.post('/forms/create', authGuard, async (request, response) => {
        const { id } = request.user;

        const form = formsService.getEmptyForm(id);
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
