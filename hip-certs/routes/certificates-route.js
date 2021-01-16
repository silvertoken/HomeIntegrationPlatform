'use strict'
const controller = require('../controllers/certificates-controller')
const joi = require('joi')

exports.init = (server) => {
    //get all certificates
    server.route({
        method: 'GET',
        path: '/v1/certificates',
        options: {
            description: 'Get Certificates',
            notes: 'Returns the certificates',
            tags: ['api'],
        },
        handler: controller.getCertificates
    })

    //generate new CA
    server.route({
        method: 'POST',
        path: '/v1/certificates/ca',
        options: {
            description: 'Generates a new CA certificate',
            notes: 'Generates a new CA certificate replacing the old one',
            tags: ['api'],
            validate: {
                payload: joi.object({
                    cn: joi.string().required(),
                    bits: joi.number().min(2048).required(),
                    days: joi.number().min(1).required(),
                    phrase: joi.string().required()
                })
            }
        },
        handler: controller.generateCA
    })
}

