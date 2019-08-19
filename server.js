'use strict';

const fs = require('fs'),
    path = require('path'),
    http = require('http'),
    bodyParser = require('body-parser');

const app = require('express')();
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const serverPort = process.env.PORT || 3000;

// swaggerRouter configuration
const options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    app.use(bodyParser.json());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", process.env.ORIGIN); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, User-Database-Interaction, application/json, Accept");
        next();
    });

    // Start the server
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on (https://zero-waste-database.herokuapp.com)');
        console.log('Swagger-ui is available on https://zero-waste-database.herokuapp.com/docs');
    });

});
