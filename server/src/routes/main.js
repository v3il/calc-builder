module.exports = app => {
    app.get('/', (request, response) => {
        response.send({
            test: 1,
        });
    });
};
