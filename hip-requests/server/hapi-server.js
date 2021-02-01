'use strict'

const hapi = require('@hapi/hapi');
const requests = require('../routes/requests-route')

exports.start = async (port) => {
    const server = hapi.server({
        port: port,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    await server.register([
        {
            plugin: require('hapi-pino'),
            options: {
                prettyPrint: true,
                redact: ['req.headers.authorization']
            }
        },
        {
            plugin: require('@hapi/inert')
        },
        {
            plugin: require('@hapi/vision')
        },
        {
            plugin: require('hapi-swagger'),
            options: {
                info: {
                    title: 'HIP Requests API Documentation',
                    version: process.env.npm_package_version
                }
            }
        }

    ])

    //init routes
    requests.init(server)

    //start server
    await server.start()
    server.logger.info('hip-requests is listening on port ' + port)

    return server
}
