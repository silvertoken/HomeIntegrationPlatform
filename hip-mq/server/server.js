'use strict';
const express = require('express');
const bodyparser = require('body-parser');
const messages = require('../routes/messages');

const start = (options) => {
    return new Promise((resolve, reject) => {
        // we need to verify if we have a connection to rabbit
        if (!options.msg) {
            reject(new Error('The server must be started with an active connection to rabbit'));
        }
        if (!options.port) {
            reject(new Error('The server must be started with an available port'));
        }
        // let's init a express app, and add some middlewares
        const app = express();
        app.use(bodyparser.json());
        app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, err:' + err));
            res.status(500).send('Something went wrong!');
        });
        
        //declare our routers
        const msgRouter = express.Router();

        // we add our routers to the app
        app.use("/messages", msgRouter);
        
        //init our routes
        messages(msgRouter, options.msg);

        // finally we start the server, and return the newly created server 
        const server = app.listen(options.port, () => resolve(server));
  });
};

module.exports = Object.assign({}, {start});