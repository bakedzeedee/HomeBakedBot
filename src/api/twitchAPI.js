import { sendRequest } from '../utility/apiUtil';
import { getToken } from '../services/twitchSession';

export const getAccessToken = async (callback = res => { }) => {
    const options = {
        hostname: 'id.twitch.tv',
        path: '/oauth2/token'
            + `?client_id=${process.env.REACT_APP_T_CLIENT_ID}`
            + `&client_secret=${process.env.REACT_APP_T_CLIENT_SECRET}`
            + '&grant_type=client_credentials',
        method: 'POST'
    };

    sendRequest(options, callback);
};

export const getBroadcasterId = async (username, callback = res => { }) => {
    const options = {
        hostname: 'api.twitch.tv',
        path: `/helix/users?login=${username}`,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Client-Id': process.env.REACT_APP_T_CLIENT_ID
        }
    };

    sendRequest(options, callback);
};

export const getUserInfo = async (broadcasterName, callback = res => { }) => {

    const userInfoCallback = async res => {
        if (res?.data[0]?.id) {
            console.log("got user ID: " + res.data[0].id);

            const options = {
                hostname: 'api.twitch.tv',
                path: `/helix/channels?broadcaster_id=${res.data[0].id}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + getToken(),
                    'Client-Id': process.env.REACT_APP_T_CLIENT_ID
                }
            };

            sendRequest(options, callback);
        } else {
            callback(null);
        }
    };

    getBroadcasterId(broadcasterName, userInfoCallback);
};

export const getClips = async (broadcasterName, startDate, endDate, maxNumberOfClips, callback = res => { }) => {
    
    const clipsCallback = async res => {
        if (res?.data && res.data[0]?.id) {
            console.log("got user ID: " + res.data[0].id);

            const options = {
                hostname: 'api.twitch.tv',
                path: '/helix/clips'
                    + `?broadcaster_id=${res.data[0].id}`
                    + `&ended_at=${endDate}`
                    + `&first=${maxNumberOfClips}`
                    + `&started_at=${startDate}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + getToken(),
                    'Client-Id': process.env.REACT_APP_T_CLIENT_ID
                }
            };

            sendRequest(options, callback);
        } else {
            callback(null);
        }
    };
    
    getBroadcasterId(broadcasterName, clipsCallback);
};

export const getClipInfo = async (clipIDs, callback = res => { }) => {
    const clips = clipIDs.join(',');

    const options = {
        hostname: 'api.twitch.tv',
        path: '/helix/clips'
            + `?id=${clips}`,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Client-Id': process.env.REACT_APP_T_CLIENT_ID
        }
    };

    sendRequest(options, callback);
};