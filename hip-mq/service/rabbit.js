const amqp = require('amqplib/callback_api');
const fs = require('fs');

const connect = (options, mediator) => {
    mediator.once('boot.ready', () => {

        //read in the certificates for auth
        const ca = [fs.readFileSync(options.ca)];
        const cert = fs.readFileSync(options.cert);
        const key = fs.readFileSync(options.key);
        console.log('Connecting to rabbit with amqps://' + options.server + ':' + options.port);
        amqp.connect('amqps://' + options.server + ':' + options.port, {
            cert: cert,
            key, key,
            ca: ca,
            credentials: amqp.credentials.external()
        } ,(err, conn) => {
            if(err) {
                mediator.emit('mq.error', err);
            }
            const mq = conn;
            mediator.emit('mq.ready', mq);
        });
    });
};

module.exports = Object.assign({}, {connect});