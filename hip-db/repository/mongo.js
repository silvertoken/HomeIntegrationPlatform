const MongoClient = require('mongodb');
const fs = require('fs');

const connect = (options, mediator) => {
    mediator.once('boot.ready', () => {

        //read in the certificates for auth
        const ca = [fs.readFileSync(options.ca)];
        const cert = fs.readFileSync(options.cert);
        const key = fs.readFileSync(options.key);

        //connect using x509 client authentication
        MongoClient.connect('mongodb://' + options.server + '?authMechanism=MONGODB-X509&ssl=true', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            sslKey: key,
            sslCert: cert,
            sslCA: ca
        }, (err, client) => {
            if (err) {
                mediator.emit('db.error', err);
            }
            const db = client.db(options.db);
            
            mediator.emit('db.ready', db);
        });
    });
};

module.exports = Object.assign({}, {connect});