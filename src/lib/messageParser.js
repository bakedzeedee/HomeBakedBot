import { commands, hiddenCommands, media, hiddenMedia, regex } from './commands.js';
import Queue from './queue.js';
import { getGroupLevel } from './userUtil.js';
import { StringUtil } from './utility.js';

const queue = new Queue(1000);

const debugContext = (context) => {
    console.log('\n\n-----');
    for (const key of Object.keys(context)) {
        if (context[key] instanceof Object) {
            let msg = `   ${key}: {`;
            for (const innerKey of Object.keys(context[key])) {
                msg += ` ${innerKey}:${context[key][innerKey]},`;
            }
            console.log(msg.slice(0, -1) + ' }');
        } else {
            console.log(`   ${key}: ${context[key]}`);
        }
    }
}

export const processMessage = (target, context, command) => {
    const commandParts = StringUtil.halve(command, ' '); // split up the command
    const commandName = commandParts[0]; // first word
    const commandQuery = commandParts[1] || ''; // string after first first word
    const groupLevel = getGroupLevel(context);
    const groups = ['user', 'vip', 'mod', 'broadcaster', 'superuser'].slice(0, groupLevel);
    const instant = []; // commands to be run instantly
    const queued = []; // commands to be queued and executed one after another

    /* push all applicable commands for all groups up to provided groupLevel */
    for (const group of groups) {
        if (commands[group][commandName]) instant.push(commands[group][commandName]);
        if (hiddenCommands[group][commandName]) instant.push(hiddenCommands[group][commandName]);
        if (media[group][commandName]) queued.push(media[group][commandName]);
        if (hiddenMedia[group][commandName]) queued.push(hiddenMedia[group][commandName]);
    }

    /* execute commands if any, otherwise try to match regex */
    if (instant.length || queued.length) {
        /* execute instant commands */
        for (const fn of instant) {
            if (fn) {
                try {
                    fn(target, context, commandQuery);
                    console.log(`* Executed ${commandName} command`);
                } catch (e) {
                    console.error(e);
                }
            }
        }

        /* enqueue queued commands */
        for (const fn of queued) {
            if (fn) {
                try {
                    queue.enqueue(fn, this, [target, context, commandQuery]);
                    console.log(`* Queued ${commandName} command`);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    } else {
        /* execute first matching regex command */
        for (const expression of Object.keys(regex)) {
            if (command.match(new RegExp(expression, 'i'))) {
                try {
                    regex[expression](target, context, command);
                    console.log(`* Executed ${expression} regex`);
                    return;
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
}
