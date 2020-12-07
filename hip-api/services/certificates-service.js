'use strict'
const request = require('../models/request-model')

exports.getCertificates = () => {
    return { 
        TODO: 'Needs Implementation'
    }
}

exports.generateCA = async (cn, bits, days, phrase) => {
    const req = new request({
        name: 'generateCA',
        payload: {
            cn: cn,
            bits: bits,
            days: days,
            phrase: phrase
        },
        tasks: [
            {
                name: 'generateCA',
                payload: {
                    cn: cn,
                    bits: bits,
                    days: days,
                    phrase: phrase
                }
            }
        ]
    })
    
    return await req.save()

}