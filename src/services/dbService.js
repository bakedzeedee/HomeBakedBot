import { getBroadcasterId } from './twitchAPI';
import { memoize } from './memoize';

const getId = memoize(async (username) => {
    await getBroadcasterId(username);
});

const getChannel = {}
