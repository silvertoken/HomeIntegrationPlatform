'use strict'
const service = require('../services/requests-service')

exports.getHealth = (request, handler) => {
    return service.getHealth()
}

exports.getRequests = async (request, handler) => {
    return await service.getRequests();
}

exports.updateRequest = async (request, handler) => {
    if('state' in request.payload && request.payload.state == 'cancel') {
        return await service.cancelRequest(request.params.id)
    }

    return { message: 'update not fully implemented yet', TODO: true}
}