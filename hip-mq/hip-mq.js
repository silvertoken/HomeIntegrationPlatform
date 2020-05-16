'use strict';
// we load all the depencies we need
const {EventEmitter} = require('events');
const process = require('process');
const server = require('./server/server');
const config = require('./config/config');
const rabbit = require('./service/rabbit');
const message = require('./service/message');

const mediator = new EventEmitter();

// verbose logging when we are starting the server
console.log('--- HIP MQ REST Service ---');

// log unhandled execpetions
process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err);
});
process.on('uncaughtRejection', (err) => {
    console.error('Unhandled Rejection', err);
});

// event listener when the message queue has been connected
mediator.on('mq.ready', (mq) => {
    let msg;
    console.log('Rabbit connected connecting to service');
    message.connect(mq).then(service => {
        console.log('Message service connected. Starting server');
        msg = service;
        return server.start({
            port: config.serverSettings.port,
            msg
        });
    }).then(app => {
        console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`);
        app.on('close', () => {
            msg.disconnect();
        });
    });
});

mediator.on('mq.error', (err) => {
    console.error(err);
});

// we load the connection to rabbitmq
rabbit.connect(config.rabbitSettings, mediator);
// init the repository connection, and the event listener will handle the rest
mediator.emit('boot.ready');
