import { sendRequest } from '../utility/apiUtil';

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