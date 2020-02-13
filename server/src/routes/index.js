module.exports = app => {
    [
        require('./main'),
        require('./auth'),
    ].forEach(initRoute => initRoute(app));
};
