const express = require('express');
const boot = require('./boot');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json('combine'));

boot(app);

app.listen(3000);


app.get('/', (req, res) => {
    res.send({
        test: 1
    })
})