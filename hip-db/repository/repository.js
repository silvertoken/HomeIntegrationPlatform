'use strict';
const {ObjectID} = require('mongodb');

const repository = (db) => {
   
    //lookup the collection using the hashmap index
    const postDocuments = (collection, body, page, pageSize) => {
        return new Promise((resolve, reject) => {
            const documents = []
            const cursor = db.collection(collection).find(body).skip((pageSize * page) - pageSize).limit(pageSize);
            const addDocument = (doc) => {
                documents.push(doc);
            };
            const sendDocument = (err) => {
                if (err) {
                    reject(new Error('An error occured fetching documents from collection ' + collection + ' with query ' + JSON.stringify(body)));
                }
                resolve(documents.slice());
            };
            cursor.forEach(addDocument, sendDocument);
        });
    }
    
    //insert one document into a collection
    const postInsertOne = (collection, body) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).insertOne(body, (err, request) => {
                if(err) {
                    reject(new Error('an error occured inserting document into collection ' + collection + ' with body ' + JSON.stringify(body)));
                }
                resolve(request);
            });
        });
    };

    //update one document in collection
    const postUpdateOne = (collection, query, body) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).updateOne(query, body, (err, request) => {
                if(err) {
                    reject(new Error('an error occured updating document in collection ' + collection + ' with query ' + JSON.stringify(query) + ' and body ' + JSON.stringify(body)));
                }
                resolve(request);
            });
        });
    };

    //update multiple documents in collection
    const postUpdateMany = (collection, query, body) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).updateMany(query, body, (err, request) => {
                if(err) {
                    reject(new Error('an error occured updating documents in collection ' + collection + ' with query ' + JSON.stringify(query) + ' and body ' + JSON.stringify(body)));
                }
                resolve(request);
            });
        });
    };

    //update one document in collection
    const postDeleteOne = (collection, query) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).deleteOne(query, (err, request) => {
                if(err) {
                    reject(new Error('an error occured deleting document in collection ' + collection + ' with query ' + JSON.stringify(query)));
                }
                resolve(request);
            });
        });
    };

    //update multiple documents in collection
    const postDeleteMany = (collection, query) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).deleteMany(query, (err, request) => {
                if(err) {
                    reject(new Error('an error occured deleting documents in collection ' + collection + ' with query ' + JSON.stringify(query)));
                }
                resolve(request);
            });
        });
    };

    //close the database connection
    const disconnect = () => {
        db.close();
    };

    return Object.create({
        postDocuments,
        postInsertOne,
        postUpdateOne,
        postUpdateMany,
        postDeleteOne,
        postDeleteMany,
        disconnect
    });
};

//connect to the database
const connect = (db) => {
    return new Promise((resolve, reject) => {
        if(!db) {
            reject(new Error('db conneciton is required!'));
        }
        //TODO: Add event code here
        db.on('close', () => { console.log('--- TODO: Fix close event ---  -> lost connection'); });
        db.on('reconnect', () => { console.log('--- TODO: Fix reconnect event ---  -> lost connection'); });

        resolve(repository(db));
    });
};

// export the connected repo
module.exports = Object.assign({}, {connect});