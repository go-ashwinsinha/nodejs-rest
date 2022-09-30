const ValidationError = require('express-json-validator-middleware').ValidationError
const requiredEnvVariables = ['NODE_ENV']
require('./utils/envVarExistCheck').checkEnvVariableExist(requiredEnvVariables)

const http = require('http')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')



const app = express()

app.use(helmet())
app.use(compression())
app.use(bodyParser.json())


//app.use(requestTimeLogger)

app.use(require('./routes'))

/**
 * Error handler middleware for validation errors.
 */
app.use((error, request, response, next) => {
    // Check the error is a validation error
    if (error instanceof ValidationError) {
        // Handle the error
        response.status(400).send(error.validationErrors);
        next();
    } else {
        // Pass error on if not a validation error
        console.log("not validation error")
        next(error);
    }
});

module.exports = http.createServer(app)

