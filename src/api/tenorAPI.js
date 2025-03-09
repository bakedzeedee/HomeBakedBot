import https from 'https';

export const getGifs = (queryTerm, callback = res => {}) => {
    const options = {
        hostname: 'g.tenor.com/v1',
        path: '/search'
            + `?key=${process.env.REACT_APP_T_TENOR_API_KEY}`
            + `&locale=en_US`
            + `&q=${queryTerm}`
            + `&contentfilter=low`
            + `&media_filter=minimal`
            + `&limit=50`,
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