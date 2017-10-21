function getValue(hash, key, def) {
    if (hash.hasOwnProperty(key)) {
        return hash[key];
    }
    return (def === undefined) ? '' : def;
}

function getTimes(series) {
    const times = series.match(/\S+/g) || [];
    return times.length > 4 ? {
        min: parseInt(times[0], 10),
        mean: parseInt(times[1], 10),
        sd: parseFloat(times[2]),
        median: parseInt(times[3], 10),
        max: parseInt(times[4], 10),
    } : {
        min: 0,
        mean: 0,
        sd: 0,
        median: 0,
        max: 0,
    };
}

function getGenreralData(hash) {
    function get(key, def) {
        return getValue(hash, key, def);
    }

    function getInt(key) {
        return parseInt(get(key), 10) || 0;
    }

    function getFloat(key) {
        return parseFloat(get(key)) || 0.0;
    }


    const result = {
        server: {
            software: get('Server Software'),
            hostname: get('Server Hostname'),
            port: getInt('Server Port'),
        },
        document: {
            path: get('Document Path'),
            length: getInt('Document Length'),
        },
        test: {
            concurencyLevel: getInt('Concurrency Level'),
            timeTaken: getFloat('Time taken for tests'),
            completeRequests: getInt('Complete requests'),
            failedRequests: getInt('Failed requests'),
            totalTransferred: getInt('Total transferred'),
            htmlTransferred: getInt('HTML transferred'),
            requestsPerSecond: getFloat('Requests per second'),
            timePerRequest: getFloat('Time per request'),
            timePerRequestAll: getFloat('Time per request'),
            transferRate: getFloat('Transfer rate'),
        },
        time: {
            connect: getTimes(get('Connect')),
            processing: getTimes(get('Processing')),
            waiting: getTimes(get('Waiting')),
            total: getTimes(get('Total')),
        },
    };
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
