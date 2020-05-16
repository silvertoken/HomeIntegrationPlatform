'use strict';
const express = require('express');
const bodyparser = require('body-parser');
const hip = require('../routes/hip');

const start = (options) => {
    return new Promise((resolve, reject) => {
        // we need to verify if we have a repository added and a server port
        if (!options.repo) {
            reject(new Error('The server must be started with an active connection'));
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
        const hipRouter = express.Router();

        // we add our routers to the app
        app.use("/hip", hipRouter);
        
        //init our routes
        hip(hipRouter, options);

        // finally we start the server, and return the newly created server 
        const server = app.listen(options.port, () => resolve(server));
  });
};

module.exports = Object.assign({}, {start});