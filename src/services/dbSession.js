import { getCommands } from '../api/dbAPI';

let commands = {};


commands = commands[channelId] || await getCommands(channelId);