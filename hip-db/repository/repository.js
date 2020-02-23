'use strict';
const {ObjectID} = require('mongodb');
const virtualMachines = require("./collections/virtualmachines");

const repository = (db) => {
    //store the collections in a simple hashmap
    var collectionMap = new Object();
    collectionMap['VirtualMachines'] = virtualMachines(db);
    
    //lookup the collection using the hashmap index
    const getCollection = (collection) => {
        return collectionMap[collection];
    }
    
    //close the database connection
    const disconnect = () => {
        db.close();
    };

    return Object.create({
        getCollection,
        disconnect
    });
};

//connect to the database
const connect = (connection) => {
    return new Promise((resolve, reject) => {
        if(!connection) {
            reject(new Error('conneciton is required!'));
        }
        resolve(repository(connection));
    });
};

// export the connected repo
module.exports = Object.assign({}, {connect});