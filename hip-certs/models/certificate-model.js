'use strict'

const mongoose = require('mongoose')

exports.certificate = mongoose.model('certificate',( 
        new mongoose.Schema({
            name: { type: String },
            public: { type: String },
            private: { type: String },
            phrase: { type: String },
            bits: { type: String },
            type: { type: String },
            issuer: { type: String },
            notBefore: { type: Date },
            notAfter: { type: Date },
            subject: [
                {
                    name: String,
                    value: String
                }
            ],
            alternatives: { type: String },
            thumbprint: { type: String },
            serial: { type: String },
            algorithm: { type: String },
            isCA: {type: Boolean },
            extensions: [
                {
                    name: String,
                    value: String
                }
            ]
        }, { timestamps: true })
    ),
    'certificates'
)