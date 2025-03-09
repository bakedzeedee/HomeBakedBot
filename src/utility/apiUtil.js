import https from 'https';

export const sendRequest = (options, callback = () => {}) => {
    const responseParser = (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            callback(JSON.parse(data));
        });
    };
    
    const req = https.request(options, responseParser);
    req.end();
};