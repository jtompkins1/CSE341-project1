// project1 server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const { logError, isOperationalError } = require('./errorHandler')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3000;

//app.use(express.json());
app.use(bodyParser.json());
app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//error handling

process.on('uncaughtException', error => {
 logError(error)

 if (!isOperationalError(error)) {
 process.exit(1)
 }
})


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Running on port ${port}`);});
    }
});
