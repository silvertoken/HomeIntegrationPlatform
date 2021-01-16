'use strict'
const service = require('../services/certificates-service')

exports.getHealth = (request, handler) => {
    return service.getHealth()
}

exports.getCertificates = (request, handler) => {
    return service.getCertificates();
}

exports.generateCA = async (request, handler) => {
    const p = request.payload
    const req = await service.generateCA(p.cn, p.bits, p.days, p.phrase);
    if('id' in req) {
        return req;
    }
    else {
        return handler.response(req).code(500)
    }
}