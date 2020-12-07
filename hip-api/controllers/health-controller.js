'use strict'
const service = require('../services/health-service')

exports.getHealth = (request, handler) => {
    return service.getHealth()
}