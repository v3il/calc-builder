require('dotenv').config();

require('express-async-errors');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = require('express')();

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(cors());
app.use(require('cookie-parser')());
app.use(bodyParser.json('combine'));

require('./routes')(app);

app.listen(process.env.PORT || 3000);
