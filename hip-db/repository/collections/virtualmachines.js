'use strict';
const {ObjectID} = require('mongodb');

const VirtualMachines = (db) => {
    
    const virtualMachines = db.collection('VirtualMachines');
  
    const getVirtualMachineByID = (id) => {
        return new Promise((resolve, reject) => {
            const query = {_id: new ObjectID(id)};         
            virtualMachines.findOne(query, {}, (err, request) => {
                if (err) {
                    reject(new Error('An error occured fetching a virtual machine with id: ' + id + ', err: ' + err));
                }
                resolve(request);
            });
        });
    };
    
    const insertVirtualMachine = (req) => {
        return new Promise((resolve, reject) => {
            virtualMachines.insertOne(req, (err, request) => {
                if (err) {
                    reject(new Error('an error occured inserting virtual machine ' + req.name + ', err:' + err));
                }
                resolve(request);
            });
        });
    };
    
    const updateVirtualMachine = (id, req) => {
        return new Promise((resolve, reject) => {
            const query = {_id: new ObjectID(id)};
            const newDoc = Object.assign({}, {$set: req});
            virtualMachines.updateOne(query, newDoc, (err, request) => {
                if(err) {
                    reject(new Error('an error occured updating virtual machine with id: ' + id + ', err:' + err));
                }
                resolve(request);
            });
        });
    };

    const deleteVirtualMachine = (id) => {
        return new Promise((resolve, reject) => {
            const query = {_id: new ObjectID(id)};
            virtualMachines.deleteOne(query, (err, request) => {
                if(err) {
                    reject(new Error('an error occured removing virtual machine with id: ' + id + ', err:' + err));
                }
                resolve(request);
            });
        });
    };

    const getAllVirtualMachines = (page, pageSize) => {
        return new Promise((resolve, reject) => {
            const machines = [];
            const cursor = virtualMachines.find({}).skip((pageSize * page) - pageSize).limit(pageSize);
            const addVirtualMachine = (vm) => {
                machines.push(vm);
            };
            const sendVirtualMachine = (err) => {
                if (err) {
                    reject(new Error('An error occured fetching virtual machines, err:' + err));
                }
                resolve(machines.slice());
            };
            cursor.forEach(addVirtualMachine, sendVirtualMachine);
        });
    };
    
    return Object.create({
        getVirtualMachineByID,
        getAllVirtualMachines,
        insertVirtualMachine,
        updateVirtualMachine,
        deleteVirtualMachine
    });
};

module.exports = VirtualMachines;