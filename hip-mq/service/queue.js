'use strict';

const queue = (ch, q) => {
    const channel = ch;
    const que = q;

    // send a message to the queue
    const sendMessage = (msg) => {
        return new Promise((resolve, reject) => {
            channel.assertQueue(que, { durable: false }, (err, _ok) => {
                if(err) {
                    reject(new Error('an error occured creating or verifying the queue ' + que + ', err: ' + err));
                }
            });
            resolve(channel.sendToQueue(que, Buffer.from(msg)));
        });
    };

    return Object.create({
        sendMessage
    });
};

module.exports = queue;