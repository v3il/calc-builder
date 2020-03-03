module.exports = app => {
    [
        require('./main'),
        require('./auth'),
        require('./forms'),
        require('./error'),
    ].forEach(initRoute => initRoute(app));
};
