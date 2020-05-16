'use strict';

const tasks = require("./queue");

const message = (mq) => {
    const channel = mq.createChannel((err, chan) => {
        if(err) {
            throw err;
        }
        return chan;
    });

    var queueMap = new Object();
    queueMap['Tasks'] = tasks(channel, 'Tasks');

    const getQueue = (queue) => {
        return queueMap[queue];
    }

    //close the rabbit connection
    const disconnect = () => {
        mq.close();
    };

    return Object.create({
        disconnect,
        getQueue
    });
};

//connect rabbit server to the service
const connect = (mq) => {
    return new Promise((resolve, reject) => {
        if(!mq) {
            reject(new Error('mq is required!'));
        }
        resolve(message(mq));
    });
};

// export the connected repo
module.exports = Object.assign({}, {connect});