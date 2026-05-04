const express = require('express');
const bodyParser = require('body-parser');
const workdayRouter = require('./config/workday');
const salesforceRouter = require('./config/salesforce');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/workday', workdayRouter);
app.use('/salesforce', salesforceRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
