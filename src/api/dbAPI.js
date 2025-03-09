import { sendRequest } from '../utility/apiUtil';

const apiV1 = {
    channel: {
        get: "/api/v1/channel",
        getAll: "/api/v1/channel/all",
        add: "/api/v1/channel",
        update: "/api/v1/channel"
    },
    command: {
        getById: "/api/v1/command",
        getByParams: "/api/v1/command",
        getAll: "/api/v1/command/all",
        add: "/api/v1/command",
        update: "/api/v1/command"
    }
};

export const getChannel = (channelId, callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.channel.get}`
            + `/${channelId}`,
        method: 'GET',
        port: `${process.env.REACT_APP_T_DB_PORT}`
    };

    return sendRequest(options, callback);
}

export const getChannels = (callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.channel.getAll}`,
        method: 'GET',
        port: `${process.env.REACT_APP_T_DB_PORT}`
    };

    return sendRequest(options, callback);
}

export const addChannel = (channelId, channelName, callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.channel.add}`,
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`,
        body: {
            id: channelId,
            channel: channelName
        }
    };

    return sendRequest(options, callback);
}

export const updateChannel = (channelId, channelName, callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.channel.update}`,
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`,
        body: {
            id: channelId,
            channel: channelName
        }
    };

    return sendRequest(options, callback);
}

export const getCommandById = (commandId, callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.command.getById}`
            + `/${commandId}`,
        method: 'GET',
        port: `${process.env.REACT_APP_T_DB_PORT}`
    };

    return sendRequest(options, callback);
}

export const getCommandByParams = (name, channelId, triggerType, trigger, callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.command.getByParams}`
            + `?name=${name}`
            + `&channel_id=${channelId}`
            + `&trigger_type=${triggerType}`
            + `&trigger=${trigger}`,
        method: 'GET',
        port: `${process.env.REACT_APP_T_DB_PORT}`
    };

    return sendRequest(options, callback);
}

export const getCommands = (channelId, callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.command.getAll}`
            + `/${channelId}`,
        method: 'GET',
        port: `${process.env.REACT_APP_T_DB_PORT}`
    };

    return sendRequest(options, callback);
}

export const addCommand = (name, channelId, trigger, callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.command.add}`,
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`,
        body: {
            name: name,
            channelId: channelId,
            trigger: trigger
        }
    };

    return sendRequest(options, callback);
}

export const editCommand = (name, channelId, trigger, callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.command.update}`,
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`,
        body: {
            name: name,
            channelId: channelId,
            trigger: trigger
        }
    };

    return sendRequest(options, callback);
}