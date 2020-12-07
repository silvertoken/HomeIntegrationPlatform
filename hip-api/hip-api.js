'use strict'
const server = require('./server/hapi-server')
const mongoose = require('mongoose')
const fs = require('fs')

//read in certs
const ca = [fs.readFileSync('X:/ansible/ssl/ca/ca.localdomain.crt')]
const cert = fs.readFileSync('X:/ansible/ssl/certs/hip.mongo.localdomain.crt');
const key = fs.readFileSync('X:/ansible/ssl/private/hip.mongo.localdomain.pem');

//connect to the DB
mongoose.connect('mongodb://mongo.localdomain:27017/hip?authMechanism=MONGODB-X509&ssl=true', {
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

server.start(443)