require('dotenv').config();

const initRoutes = require('./routes');
const initPassport = require('./boot/passport');
const initExpress = require('./boot/express');

const app = require('express')();

initExpress(app);
initPassport(app);
initRoutes(app);

app.listen(process.env.PORT || 3000);
