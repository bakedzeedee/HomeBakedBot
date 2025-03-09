import React from 'react';
import ReactDOM from 'react-dom';
import client from './clientHelper.js';

import Audio from './components/Audio.js';
import Image from './components/Image.js';
import Video from './components/Video.js';

import { getGifs } from '../services/tenorAPI.js';
import { playHelper, sayShoutout } from './commandHelper.js';
import { getGroupLevel } from './userUtil.js';
import { NumUtil, StringUtil } from './utility.js';

import objectionSound from '../media/audio/objection.mp3';
import objectionClip from '../media/video/objection.webm';
import tobecontinuedImage from '../media/image/tobecontinued.png';
import tobecontinuedSound from '../media/audio/tobecontinued.mp3';


/* generic media player command */
const playMedia = (target, context, query) => {
    playHelper(target, context, query);
}

const fakeBan = (target, context, query) => {
    client.say(target, `${query.replace(/^@/gi, '')} has been Banned.`).catch((e) => { console.error(e) });
}

const adorableducky = (target, context, query) => {
    const index = Math.floor(Math.random() * 50);
    getGifs('chocobo', res => {
        let gifUrl = res.results[index]['media'][0]['gif']['url'];
        ReactDOM.render(<Image height="500px" source={gifUrl} timeout={3000} />, document.getElementById('root'));
    });
}

const ducky = (target, context, query) => {
    const index = Math.floor(Math.random() * 50);
    getGifs('duckling', res => {
        let gifUrl = res.results[index]['media'][0]['gif']['url'];
        ReactDOM.render(<Image height="500px" source={gifUrl} timeout={3000} />, document.getElementById('root'));
    });
}

const hardlyKnewHer = (target, context, query) => {
    const querySplit = query.split(" ");
    const liklihood = 0.2;
    if (Math.random() < liklihood) {
        client.say(target, `${querySplit[querySplit.length - 1]}? I hardly knew her!`).catch((e) => { console.error(e) });
    }
}

const magic8Ball = (target, context, query) => {
    const results = ['Nope', 'No way', 'Maybe', 'Try again', 'Yes', 'Of flippin\' course'];
    const answer = results[Math.floor(Math.random() * results.length)];
    client.say(target, answer).catch((e) => { console.error(e) });
}

const nomods = (target, context, query) => {
    const liklihood = 0.1;
    if (Math.random() < liklihood) {
        client.say(target, `homebakedbot is watching... DarkMode`).catch((e) => { console.error(e) });
    } else {
        client.say(target, `no mods TriHard`).catch((e) => { console.error(e) });
    }
}

const objection = (target, context, query) => {
    ReactDOM.render(
        <div>
            <Video source={objectionClip} />
            <Audio id="objection" source={objectionSound} />
        </div>,
        document.getElementById('root')
    );
    document.getElementById('objection').volume = 0.35;
}

const rollDice = (target, context, query) => {
    const sides = NumUtil.isInt(query) && (parseInt(query) > 0) ? parseInt(query) : 6;
    const num = Math.floor(Math.random() * sides) + 1;
    client.say(target, `${context['display-name']} rolled a ${num} [1-${sides}]`).catch((e) => { console.error(e) });
}

const onlyfans = (target, context, query) => {
    client.say(target, 'https://bit.ly/3kWnl3n').catch((e) => { console.error(e) });
}

const realBan = (target, context, query) => {
    const split = query.split(' ');
    
    const toBan = split[0];
    const reason = split[1] ? split.slice(1).join(' ') : '[no reason given]';
    try {
        if (toBan) {
            client.ban(target, toBan, reason).catch((e) => { console.error(e) });
        }
    } catch (e) {
        console.error(e);
    }
}

const searchGif = (target, context, query) => {
    if (!query) { return; }

    const queryPure = query.replace(/^@/gi, '');

    const index = Math.floor(Math.random() * 50);
    getGifs(queryPure, res => {
        let gifUrl = res.results[index]['media'][0]['gif']['url'];
        ReactDOM.render(<Image height="500px" source={gifUrl} timeout={5000} />, document.getElementById('root'));
    });
}

const shoutout = (target, context, query) => {
    const userPure = query.replace(/^@/gi, '');
    sayShoutout(target, userPure);
}

const timeout = (target, context, query) => {
    const defaultTimeout = 30;
    const split = query.split(' ');

    const toTimeout = split[0];
    const length = split[1] ? split[1] : defaultTimeout;
    const reason = split[2] ? split.slice(2).join(' ') : '[no reason given]';

    try {
        if (toTimeout) {
            client.timeout(target, toTimeout, length, reason).catch((e) => { console.error(e) });
        }
    } catch (e) {
        console.error(e);
    }
}

const timer = (target, context, query) => {
    let msPerUnit = 60000; // 1 minute
    let unitName = 'minutes';
    let numberPattern = /^ *[0-9]+( .*)?$/gi;
    let user = context.username;
    let querySplit = StringUtil.halve(query, ' ');
    let time = querySplit[0];
    let note = querySplit.length > 1 ? `Note: ${querySplit[1]}` : '';



    if (time.match(numberPattern)) {
        setTimeout(() => {
            client.say(target, `@${user} Your timer is up! ${note}`).catch((e) => { console.error(e) });
        }, time * msPerUnit);

        client.say(target, `@${user} Timer set for ${time} ${unitName}. ${note}`).catch((e) => { console.error(e) });
    } else {
        client.say(target, `Usage: settimer <number of ${unitName}> [note]`).catch((e) => { console.error(e) });
    }
}

const tobecontinued = (target, context, query) => {
    ReactDOM.render(
        <div>
            <Image id="tobecontinued" source={tobecontinuedImage} timeout={7100} />
            <Audio id="tobecontinued_audio" source={tobecontinuedSound} />
        </div>,
        document.getElementById('root')
    );
    document.getElementById('tobecontinued_audio').volume = 1;
}

const yes = (target, context, query) => {
    const querySplit = query.split(" ");
    const liklihood = 0.33;
    if (Math.random() < liklihood) {
        client.say(target, `yes`).catch((e) => { console.error(e) });
    }
}

const displayCommands = (target, context, query) => {
    const groupLevel = getGroupLevel(context);
    const groups = ['user', 'vip', 'mod', 'broadcaster', 'superuser'].slice(0, groupLevel);
    const commandList = [];

    /* list all applicable commands for all groups up to provided groupLevel */
    for (const group of groups) {
        for(const command of Object.keys(commands[group])) {
            commandList.push(command);
        }
    }

    client.say(target, context['display-name'] + ' - ' + commandList.join(' ')).catch((e) => { console.error(e) });
}

const displayMedia = (target, context, query) => {
    const groupLevel = getGroupLevel(context);
    const groups = ['user', 'vip', 'mod', 'broadcaster', 'superuser'].slice(0, groupLevel);
    const commandList = [];

    for (const media of process.env.REACT_APP_T_AUDIO_LIST.split(',')) {
        commandList.push(`!${media}`);
    }

    for (const media of process.env.REACT_APP_T_IMAGE_LIST.split(',')) {
        commandList.push(`!${media}`);
    }

    for (const media of process.env.REACT_APP_T_VIDEO_LIST.split(',')) {
        commandList.push(`!${media}`);
    }

    /* list all applicable commands for all groups up to provided groupLevel */
    for (const group of groups) {
        for(const command of Object.keys(media[group])) {
            commandList.push(command);
        }
    }

    client.say(target, context['display-name'] + ' - ' + commandList.join(' ')).catch((e) => { console.error(e) });
}

export const commands = {
    user: {
        '!ask': magic8Ball,
        '!cmd': displayCommands,
        '!media': displayMedia,
        '!sfx': displayMedia,
        '!roll': rollDice,
        '!timer': timer
    },
    vip: {
    },
    mod: {
    },
    broadcaster: {
    },
    superuser: {
        '!realban': realBan,
        '!timeout': timeout
    }
}

export const hiddenCommands = {
    user: {
        '!8ball': magic8Ball,
        '!ban': fakeBan,
        '!nomods': nomods,
        '!onlyfans': onlyfans
    },
    vip: {
    },
    mod: {
    },
    broadcaster: {
    },
    superuser: {
    }
}

export const media = {
    user: {
        '!gif': searchGif,
        '!tbc': tobecontinued,
        '!objection': objection
    },
    vip: {
        '!so': shoutout
    },
    mod: {
    },
    broadcaster: {
    },
    superuser: {
    }
}

export const hiddenMedia = {
    user: {
        '!adorableducky': adorableducky,
        '!ducky': ducky,
        '!tobecontinued': tobecontinued
    },
    vip: {
    },
    mod: {
    },
    broadcaster: {
    },
    superuser: {
    }
}

export const regex = {
    '^!\\w+($| .*)' : playMedia,
    '.+er$' : hardlyKnewHer,
    '^no+$' : yes
};
