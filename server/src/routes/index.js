module.exports = app => {
    [
        require('./main'),
        require('./auth'),
        require('./forms'),
    ].forEach(initRoute => initRoute(app));
};
