const authGuard = require('../guards');

const knexInstance = require('../knexInstance');

module.exports = app => {
    app.get('/forms', authGuard, async (request, response) => {
        const user = request.user;

        try {
            const userForms = await knexInstance('forms')
                .where({ user_id: user.id })
                .select();

            response.json(userForms);
        } catch (error) {
            response.status(500).send({
                error: error.message,
            });
        }
    });

    app.post('/forms', (request, response) => {
        response.status(200).json({
            status: 'Ok',
        });
    });
};
