'use strict';
const status = require('http-status');

module.exports = (router, service) => {
    
    // send a new message
    router.post('/send', (req, res, next) => {
        service.getQueue(req.body.queue).sendMessage(JSON.stringify(req.body.message)).then(response => {
            if(response) {
               const json = Object.assign({}, { status: 'success', message: req.body.message, queue: req.body.queue });
               return res.status(status.OK).json(json);
            }
            const json = Object.assign({}, { status: 'failed', message: req.body.message, queue: req.body.queue });
            return res.status(500).json(json);
        }).catch(err => {
            const json = Object.assign({}, { request: req.body, message: err.message, stack: err.stack });
            return res.status(500).json(json);
        }).catch(next);
    });

};