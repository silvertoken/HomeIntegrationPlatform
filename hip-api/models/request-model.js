'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema;
const request = new schema({
    name: { type: String },
    payload: {},
    state: { type: String, default: 'pending' },
    startedAt: { type: Date },
    completedAt: { type: Date },
    tasks: [
        {
            _id: false,
            name: { type: String },
            startedAt: { type: Date },
            completedAt: { type: Date },
            state: { type: String, default: 'pending' },
            payload: {},
            response: {}
        }
    ]
}, { timestamps: true})

module.exports = mongoose.model('request', request, 'requests')
