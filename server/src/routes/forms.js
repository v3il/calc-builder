module.exports = app => {
    app.get('/forms', (request, response) => {
        response.status(200).json({
            status: 'Ok',
        });
    });

    app.post('/forms', (request, response) => {
        response.status(200).json({
            status: 'Ok',
        });
    });
};
