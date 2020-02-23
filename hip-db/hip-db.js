'use strict';
// we load all the depencies we need
const {EventEmitter} = require('events');
const process = require('process');
const server = require('./server/server');
const config = require('./config/config');
const repository = require('./repository/repository');
const mediator = new EventEmitter();
const mongo = require('./repository/mongo');

// verbose logging when we are starting the server
console.log('--- HIP DB REST Service ---');

// log unhandled execpetions
process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err);
});
process.on('uncaughtRejection', (err) => {
    console.error('Unhandled Rejection', err);
});

// event listener when the repository has been connected
mediator.on('db.ready', (db) => {
    let rep;
    repository.connect(db).then(repo => {
        console.log('Database connected. Starting server');
        rep = repo;
        return server.start({
            port: config.serverSettings.port,
            repo
        });
    }).then(app => {
        console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`);
        app.on('close', () => {
            rep.disconnect();
        });
    });
});

mediator.on('db.error', (err) => {
    console.error(err);
});

// we load the connection to the database
mongo.connect(config.dbSettings, mediator);
// init the repository connection, and the event listener will handle the rest
mediator.emit('boot.ready');
