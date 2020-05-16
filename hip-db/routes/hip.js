'use strict';
const status = require('http-status');

module.exports = (router, options) => {
    const {repo} = options;
    
    router.post('/:collection/documents', (req, res, next) => {
        var page = 1;
        var pageSize = 100;
        if(typeof req.query.page !== 'undefined') {
            page = parseInt(req.query.page);
        }
        if(typeof req.query.pageSize !== 'undefined') {
            pageSize = parseInt(req.query.pageSize);
        }
        repo.postDocuments(req.params.collection, req.body, page, pageSize).then(response => {
            res.status(status.OK).json(response);
        }).catch(err => {
            const json = Object.assign({}, { message: err.message, stack: err.stack });
            res.status(500).json(json);
        }).catch(next);

    });

    router.post('/:collection/insert', (req, res, next) => {
        repo.postInsertOne(req.params.collection, req.body).then(response => {
            res.status(status.OK).json(response);
        }).catch(err => {
            const json = Object.assign({}, { request: JSON.stringify(req.body), message: err.message, stack: err.stack });
            res.status(500).json(json);
        }).catch(next);
    });

    router.post('/:collection/update', (req, res, next) => {
        repo.postUpdateMany(req.params.collection, req.body.query, req.body.values).then(response => {
            res.status(status.OK).json(response);
        }).catch(err => {
            const json = Object.assign({}, { request: JSON.stringify(req.body), message: err.message, stack: err.stack });
            res.status(500).json(json);
        }).catch(next);
    });

    router.post('/:collection/delete', (req, res, next) => {
        repo.postDeleteMany(req.params.collection, req.body).then(response => {
            res.status(status.OK).json(response);
        }).catch(err => {
            const json = Object.assign({}, { request: JSON.stringify(req.body), message: err.message, stack: err.stack });
            res.status(500).json(json);
        }).catch(next);
    });

    router.get('/health', (req, res) => {
        repo.getHealth().then(response => {
            if(typeof response !== 'undefined' && response.ok !== 'undefined' && response.ok == 1) {
                res.status(status.OK).json(Object.assign({}, { status: 'running', stats: response }));
            }
            else {
                res.status(status.OK).json(Object.assign({}, { status: 'down', stats: response }));
            }
        }).catch(err => {
            res.status(500).json(Object.assign({}, {stats: {}, status: 'down', message: err.message }));
        });
    });
};