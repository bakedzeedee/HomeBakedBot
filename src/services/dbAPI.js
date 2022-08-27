import { sendRequest } from './apiUtil';

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

export const addChannel = (channel, callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.channel.add}`,
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`,
        body: JSON.stringify(channel)
    };

    return sendRequest(options, callback);
}

export const updateChannel = (channel, callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.channel.update}`,
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`,
        body: JSON.stringify(channel)
    };

    return sendRequest(options, callback);
}

export const getCommandById = (callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.command.getById}`
            + `?client_id=${process.env.REACT_APP_T_CLIENT_ID}`
            + `&client_secret=${process.env.REACT_APP_T_CLIENT_SECRET}`
            + '&grant_type=client_credentials',
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`
    };

    return sendRequest(options, callback);
}

export const getCommandByParams = (callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.command.getByParams}`
            + `?client_id=${process.env.REACT_APP_T_CLIENT_ID}`
            + `&client_secret=${process.env.REACT_APP_T_CLIENT_SECRET}`
            + '&grant_type=client_credentials',
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`
    };

    return sendRequest(options, callback);
}

export const getCommands = (callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.command.getAll}`
            + `?client_id=${process.env.REACT_APP_T_CLIENT_ID}`
            + `&client_secret=${process.env.REACT_APP_T_CLIENT_SECRET}`
            + '&grant_type=client_credentials',
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`
    };

    return sendRequest(options, callback);
}

export const addCommand = (callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.command.add}`
            + `?client_id=${process.env.REACT_APP_T_CLIENT_ID}`
            + `&client_secret=${process.env.REACT_APP_T_CLIENT_SECRET}`
            + '&grant_type=client_credentials',
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`
    };

    return sendRequest(options, callback);
}

export const editCommand = (callback = () => { }) => {
    const options = {
        hostname: `${process.env.REACT_APP_T_DB_HOST}`,
        path: `${apiV1.command.update}`
            + `?client_id=${process.env.REACT_APP_T_CLIENT_ID}`
            + `&client_secret=${process.env.REACT_APP_T_CLIENT_SECRET}`
            + '&grant_type=client_credentials',
        method: 'POST',
        port: `${process.env.REACT_APP_T_DB_PORT}`
    };

    return sendRequest(options, callback);
}