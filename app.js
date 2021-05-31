const express = require("express");
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const basePath = '/api/v1/';
const wallet = require('./routes/wallet/wallet');
const user = require('./routes/user/user');
//swagger start
app.use(basePath + 'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//swagger end
app.use(express.json());
app.use(compression());
app.use(cors({}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());

//for swagger

app.use(basePath, express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Authorization');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept', 'application/json');
    next();
});
//redirect to swagger api docs
app.get([basePath, '/'], (req, res)=> res.redirect(basePath + 'api-docs'));
app.use(basePath, cors(), [wallet, user]);

/**************error handlers*************** */
app.use(notFoundErrors);
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

function notFoundErrors(req, res, next) {
    res.status(404);
    res.format({
        json: function () {
            res.json({
                status: "error",
                code: 404,
                error: `${req.url} 'Not Found'`
            })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    });
    next();
}

function logErrors(err, req, res, next) {
    //logger.error(`url:'${req.url}'  ${JSON.stringify(err)}`);
    next(err)
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500);
        res.json({
            'status': 'error',
            "code": 500,
            "message": "oops Some thing went wrong Server",
            "description": err
        })
    } else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500);
    res.json({
        'status': 'error',
        "code": 500,
        "message": "error in server",
        "description": err
    });
    next();
}
module.exports = app;