'use strict'

const hapi = require('@hapi/hapi');
const certificates = require('../routes/certificates-route')

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
                    title: 'HIP Certificate API Documentation',
                    version: process.env.npm_package_version
                }
            }
        }

    ])

    //init routes
    certificates.init(server)

    //start server
    await server.start()
    server.logger.info('hip-certs is listening on port ' + port)

    return server
}
