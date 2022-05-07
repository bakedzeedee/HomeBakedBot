import React from 'react';
import ReactDOM from 'react-dom';
import client from './clientHelper.js';

import Audio from './components/Audio.js';
import Image from './components/Image.js';
import Video from './components/Video.js';

import { getAccessToken, getClips, getClipV5, getUserInfo } from '../services/twitchAPI.js';
import { DateUtil } from './utility.js';

/**
 * List of media assets by command name.
 * All image,sound,video assets in the following arrays
 * matching the command name will be rendered at the same time.
 * 
 * ex: !alert will render image/alert.png, sound/alert.mp3, video/alert.mp4
 */
const audioList = process.env.REACT_APP_T_AUDIO_LIST?.split(',') ?? [];
const imageList = process.env.REACT_APP_T_IMAGE_LIST?.split(',') ?? [];
const videoList = process.env.REACT_APP_T_VIDEO_LIST?.split(',') ?? [];
const CLIP_POOL_SIZE = 15;

export const playHelper = (target, context, query) => {
    const querySplit = query.substring(1).split(" "); // remove !, seperate by space
    const command = querySplit[0];
    const playAudio = audioList.includes(command);
    const playImage = imageList.includes(command);
    const playVideo = videoList.includes(command);
    const toRender =
        <div>
            {
                playAudio &&
                <Audio id={command} source={`static/media/audio/${command}.mp3`} />
            }
            {
                playImage &&
                <Image id={command} source={`static/media/image/${command}.png`} />
            }
            {
                playVideo &&
                <Video id={command} source={`static/media/video/${command}.mp4`} />
            }
        </div>;

    /* don't render if nothing to render, nothing to send 'Clear' event */
    if (playAudio || playImage || playVideo) {
        ReactDOM.render(toRender, document.getElementById('root'));
    }
};

export const sayShoutout = (target, userPure) => {
    getAccessToken(res => {
        console.log("access token: " + res.access_token);
        const accessToken = res.access_token;

        /* say shoutout message */
        getUserInfo(userPure, accessToken,
            res => {
                console.log("user info: " + JSON.stringify(res ?? ''));

                const nameDisplay = res?.data?.[0]?.broadcaster_name;
                const gameLast = res?.data?.[0]?.game_name;
                if (nameDisplay && gameLast) {
                    client.say(target, `Make sure to give ${nameDisplay} a follow! ${nameDisplay} was last seen playing "${gameLast}" - Check them out at https://twitch.tv/${userPure} !`).catch((e) => { console.error(e) });
                }
            }
        );

        /* play random clip */
        const startDate = DateUtil.getNewDateByMonths(-12).toISOString();
        const endDate = new Date().toISOString();
        getClips(userPure, startDate, endDate, CLIP_POOL_SIZE, accessToken,
            res => {
                if (res?.data?.length) {
                    const randomIndex = Math.floor(Math.random() * res.data.length);
                    const clipURL = res.data[randomIndex].embed_url;
                    
                    console.log(`found ${res.data.length} clips`);
                    getClipV5(res.data[randomIndex].id,
                        res2 => {
                            playClip(clipURL, res2.duration);
                        }
                    );
                } else {
                    document.dispatchEvent(new CustomEvent("Clear"));
                }
            }
        );
    });
};

const playClip = (url, duration) => {
    ReactDOM.render(<iframe title="shoutoutClip" id="shoutoutClip" src={url + '&parent=localhost&autoplay=true'} height={1080} width={1920} />, document.getElementById('root'));
    document.getElementById('shoutoutClip').volume = 1;
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent("Clear"));
        ReactDOM.render(<div></div>, document.getElementById('root'));
    }, (duration + 2) * 1000);
};
