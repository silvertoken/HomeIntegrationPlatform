'use strict'
const controller = require('../controllers/requests-controller')
const joi = require('joi')

exports.init = (server) => {
    //get all requests
    server.route({
        method: 'GET',
        path: '/v1/requests',
        options: {
            description: 'Get Requests',
            notes: 'Returns the requests',
            tags: ['api'],
        },
        handler: controller.getRequests
    })

    server.route({
        method: 'PUT',
        path: '/v1/requests/{id}',
        options: {
            description: 'Update Request',
            notes: 'Allows for updating the request',
            tags: ['api'],
        },
        handler: controller.updateRequest
    })
}

