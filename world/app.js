const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const appRouter = require('./router');
require('dotenv/config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: '*/*' }));

app.use('/api', appRouter);


var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API is listening on port ${port}!`))