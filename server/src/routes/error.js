module.exports = app => {
    // eslint-disable-next-line no-unused-vars
    app.use((error, request, response, next) => {
        response.status(error.code || 500).json({ error: error.message || 'Server Error' });
    });
};
