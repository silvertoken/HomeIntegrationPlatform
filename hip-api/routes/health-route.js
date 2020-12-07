'use strict'
const controller = require('../controllers/health-controller')

exports.init = (server) => {
    server.route({
        method: 'GET',
        path: '/v1/health',
        options: {
            description: 'Get Health',
            notes: 'Returns the health of the API',
            tags: ['api'],
        },
        handler: controller.getHealth
    })
}



