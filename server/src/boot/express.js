const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app => {
    app.use(require('serve-static')(__dirname + '/../../public'));
    app.use(cors());
    app.use(require('cookie-parser')());
    app.use(bodyParser.json('combine'));
};
