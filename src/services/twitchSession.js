import { getAccessToken } from "../api/twitchAPI";

const TIMEOUT_DIFFERENCE = 10000; // 10 seconds early

let accessToken = '';

export const refreshToken = async () => {
    getAccessToken(res => {
        accessToken = res.access_token;
        setTimeout(refreshToken, res.expires_in - TIMEOUT_DIFFERENCE);
        return accessToken;
    });
};

export const getToken = () => {
    return accessToken;
}
