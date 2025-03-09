import https from 'https';

export const getRandomGif = (queryTerm, callback = res => {}) => {
    const options = {
        hostname: 'api.giphy.com/v1/gifs',
        path: '/random'
            + `?api_key=${process.env.REACT_APP_T_GIPHY_API_KEY}`
            + `&tag=${queryTerm}`
            + `&rating=pg-13`,
        method: 'GET'
    };

    const responseParser = (response) => {
        let data = '';
    
        response.on('data', (chunk) => {
            data += chunk;
        });
    
        response.on('end', () => {
            callback(JSON.parse(data));
        });
    };

    console.log('requesting random gif');
    const req = https.request(options, responseParser);
    req.end();
}