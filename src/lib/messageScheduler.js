/**
 * Messages are repeated after an interval.
 * A delay can be added to stagger the messages.
**/

import client from './clientHelper.js';
import messages from './messages.js';

const queued = [];
const intervals = [];

const intervalMessage = (target, messageObj) => {
    const interval = setInterval(()=>{
        client.say(target, messageObj.message);
    }, messageObj.interval);

    intervals.push(interval);
}

export const intervalMessages = (target) => {
    messages.forEach((messageObj)=>{
        const toQueue = setTimeout(() => {
            intervalMessage(target, messageObj);
        }, messageObj.delay);

        queued.push(toQueue);
    });
}

export const stopIntervals = () => {
    intervals.forEach((interval) => {
        clearInterval(interval);
    });

    queued.forEach((dequeue) => {
        clearTimeout(dequeue);
    })
}