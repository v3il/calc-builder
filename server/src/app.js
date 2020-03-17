const https = require('https');
const fs = require('fs');

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

https
    .createServer(
        {
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.cert'),
        },
        app,
    )
    .listen(process.env.PORT || 3000, function() {
        console.log('Example app listening on port 3000! Go to https://localhost:3000/');
    });

// app.listen(process.env.PORT || 3000);
