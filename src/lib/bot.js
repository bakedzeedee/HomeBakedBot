import client from './clientHelper.js';
import { processMessage } from './messageParser.js';
import { intervalMessages, stopIntervals } from './messageScheduler.js';
import { DateUtil } from './utility.js';

export default () => {
    // Register our event handlers (defined below)
    client.on('message', onMessageHandler);
    client.on('connected', onConnectedHandler);
    client.on('roomstate', onRoomstateHandler);
    client.on('reconnect', onReconnectHandler);
    client.on('disconnected', onDisconnectedHandler);
    client.on('timeout', onTimeoutHandler);
    client.on('ban', onBanHandler);

    // Connect to Twitch:
    client.connect();

    // Called every time a message comes in
    function onMessageHandler(channel, userstate, msg, self) {
        const message = `(${DateUtil.getDateString()}) ${userstate.username}: ${msg}\n`;

        if (self) { return; } // Ignore messages from the bot

        console.log('> ' + msg);
        console.log('> ' + channel);

        // Remove whitespace from chat message
        const command = msg.trim();
        processMessage(channel, userstate, command);
    }

    // Called every time the bot connects to Twitch server
    function onConnectedHandler(addr, port) {
        const message = `\n(* ${DateUtil.getDateString()}): Connected to ${addr}:${port}\n`;
    }

    // Called every time the bot connects to Twitch chat
    function onRoomstateHandler(channel, state) {
        const message = `\n(* ${DateUtil.getDateString()}): Joined ${channel}\n`;

        let connectMsg = process.env.REACT_APP_T_CONNECT_MESSAGE?.trim();
        if (connectMsg) {
            client.say(channel, connectMsg)
                .catch((err) => {
                    console.log(err);
                });
        }

        //schedule timer messages
        setTimeout(() => {
            intervalMessages(client.lastJoined);
        }, 1000);
    }

    function onDisconnectedHandler(reason) {
        const message = `\n(* ${DateUtil.getDateString()}): Disconnected: ${reason}\n\n`;

        stopIntervals();
    }

    function onReconnectHandler() {
        const message = `\n(* ${DateUtil.getDateString()}): Reconnecting...\n`;
    }

    function onBanHandler(channel, username, reason, userstate) {
        const message = `\n(* ${DateUtil.getDateString()}): ${username} banned\n`;

        let banMsg = process.env.REACT_APP_T_BAN_MESSAGE?.trim();
        if (banMsg) {
            client.say(channel, banMsg)
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function onTimeoutHandler(channel, username, reason, userstate) {
        const message = `\n(* ${DateUtil.getDateString()}): ${username} timed out\n`;

        let timeoutMsg = process.env.REACT_APP_T_TIMEOUT_MESSAGE?.trim();
        if (timeoutMsg) {
            client.say(channel, timeoutMsg)
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
