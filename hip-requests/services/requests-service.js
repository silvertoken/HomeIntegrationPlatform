'use strict'
const request = require('../models/request-model')

exports.getHealth = () => {
    return { 
        state: 'running', 
        api: 'down',
        db: 'down'
    }
}
exports.getRequests = async () => {
    return await request.find()
}

exports.cancelRequest = async (id) => {
    return await request.findByIdAndUpdate(
        { _id: id },
        { state: 'canceled'})
}