import runner from './lib/bot.js';
import './index.scss';
import './custom.scss';

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1);
});

runner();