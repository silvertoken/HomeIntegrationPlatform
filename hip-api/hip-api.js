'use strict'
const server = require('./server/hapi-server')
const mongoose = require('mongoose')
const fs = require('fs')
const config = require('/data/config.json')

//read in certs
const ca = [fs.readFileSync('/data/ssl/ca.crt')]
const cert = fs.readFileSync('/data/ssl/mongo.crt');
const key = fs.readFileSync('/data/ssl/mongo.pem');

//connect to the DB
mongoose.connect('mongodb://' + config.db.server + ':' + config.db.port + '/hip?authMechanism=MONGODB-X509&ssl=true', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    sslKey: key,
    sslCert: cert,
    sslCA: ca
}).catch(err => {
    console.log(err)
})

mongoose.connection.on('error', err => {
    console.log(err)
})

server.start(80)