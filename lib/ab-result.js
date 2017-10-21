function getValue(hash, key, def) {
    if (hash.hasOwnProperty(key)) {
        return hash[key];
    }
    return (def === undefined) ? '' : def;
}

function getGenreralData(hash) {
    function get(key, def) {
        return getValue(hash, key, def);
    }

    const result = {
        server: {
            software: get('Server Software'),
            hostname: get('Server Hostname'),
            port: parseInt(get('Server Port'), 10),
        },
        document: {
            path: get('Document Path'),
            length: parseInt(get('Document Length'), 10),
        },
    };

    /*
    Concurrency Level:      1
    Time taken for tests:   0.000 seconds
    Complete requests:      1
    Failed requests:        0
    Total transferred:      122 bytes
    HTML transferred:       2 bytes
    Requests per second:    2132.20 [#/sec] (mean)
    Time per request:       0.469 [ms] (mean)
    Time per request:       0.469 [ms] (mean, across all concurrent requests)
    Transfer rate:          254.03 [Kbytes/sec] received
    */
    return result;
}

function getHash(data) {
    const result = {};
    const regex = /(.+):(.+)/g;
    let m;
    while ((m = regex.exec(data)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex += 1;
        }
        result[m[1].trim()] = m[2].trim();
    }
    return result;
}

function parse(data) {
    const hash = getHash(data);
    const result = getGenreralData(hash);

    return result;
}

module.exports = parse;
