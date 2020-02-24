'use strict';
const status = require('http-status');

module.exports = (router, options) => {
    const {repo} = options;

    // get all the virtual machines limited by pageSize
    router.get('/', (req, res, next) => {
        var page = 1;
        var pageSize = 10;
        if(typeof req.query.page !== 'undefined') {
            page = parseInt(req.query.page);
        }
        if(typeof req.query.pageSize !== 'undefined') {
            pageSize = parseInt(req.query.pageSize);
        }
        
        repo.getCollection("VirtualMachines").getAllVirtualMachines(page, pageSize).then(response => {
            res.status(status.OK).json(response);
        }).catch(err => {
            const json = Object.assign({}, { message: err.message, stack: err.stack });
            res.status(500).json(json);
        }).catch(next);

    });

    // get by id
    router.get('/:id', (req, res, next) => {
        repo.getCollection("VirtualMachines").getVirtualMachineByID(req.params.id).then(response => {
            res.status(status.OK).json(response);
        }).catch(err => {
            const json = Object.assign({}, { message: err.message, stack: err.stack });
            res.status(500).json(json);
        }).catch(next);
    });
    
    // insert a new virtual machine
    router.post('/', (req, res, next) => {
        repo.getCollection("VirtualMachines").insertVirtualMachine(req.body).then(response => {
            res.status(status.OK).json(response);
        }).catch(err => {
            const json = Object.assign({}, { request: JSON.stringify(req.body), message: err.message, stack: err.stack });
            res.status(500).json(json);
        }).catch(next);
    });

    // update a virtual machine
    router.put('/:id', (req, res, next) => {
        repo.getCollection("VirtualMachines").updateVirtualMachine(req.params.id, req.body).then(response => {
            res.status(status.OK).json(response);
        }).catch(err => {
            const json = Object.assign({}, { request: JSON.stringify(req.body), message: err.message, stack: err.stack });
            res.status(500).json(json);
        }).catch(next);
    });

    // delete a virtual machine
    router.delete('/:id',(req, res, next) => {
        repo.getCollection("VirtualMachines").deleteVirtualMachine(req.params.id).then(response => {
            res.status(status.OK).json(response);
        }).catch(err => {
            const json = Object.assign({}, { message: err.message, stack: err.stack });
            res.status(500).json(json);
        }).catch(next);
    });
};