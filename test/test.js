const abResult = require('../index');
const { expect } = require('chai');

describe('parse', () => {
    it('should return populated object', () => {
        const testCases = [
            {
                data: `This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient).....done


Server Software:
Server Hostname:        localhost
Server Port:            8080

Document Path:          /1.txt
Document Length:        2 bytes

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

Connection Times (ms)
                min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     0    0   0.0      0       0
Waiting:        0    0   0.0      0       0
Total:          0    0   0.0      0       0`,
                expected: {
                    server: {
                        software: '',
                        hostname: 'localhost',
                        port: 8080,
                    },
                    document: {
                        path: '/1.txt',
                        length: 2,
                    },
                    test: {
                        concurencyLevel: 1,
                        timeTaken: 0.000,
                        completeRequests: 1,
                        failedRequests: 0,
                        totalTransferred: 122,
                        htmlTransferred: 2,
                        requestsPerSecond: 2132.20,
                        timePerRequest: 0.469,
                        timePerRequestAll: 0.469,
                        transferRate: 254.03,
                    },
                    time: {
                        connect: {
                            max: 0,
                            mean: 0,
                            median: 0,
                            min: 0,
                            sd: 0,
                        },
                        processing: {
                            max: 0,
                            mean: 0,
                            median: 0,
                            min: 0,
                            sd: 0,
                        },
                        total: {
                            max: 0,
                            mean: 0,
                            median: 0,
                            min: 0,
                            sd: 0,
                        },
                        waiting: {
                            max: 0,
                            mean: 0,
                            median: 0,
                            min: 0,
                            sd: 0,
                        },
                    },
                },
            },
            {
                data: '',
                expected: {
                    server: {
                        software: '',
                        hostname: '',
                        port: 0,
                    },
                    document: {
                        path: '',
                        length: 0,
                    },
                    test: {
                        concurencyLevel: 0,
                        timeTaken: 0,
                        completeRequests: 0,
                        failedRequests: 0,
                        totalTransferred: 0,
                        htmlTransferred: 0,
                        requestsPerSecond: 0,
                        timePerRequest: 0,
                        timePerRequestAll: 0,
                        transferRate: 0,
                    },
                    time: {
                        connect: {
                            min: 0, mean: 0, sd: 0, median: 0, max: 0,
                        },
                        processing: {
                            min: 0, mean: 0, sd: 0, median: 0, max: 0,
                        },
                        waiting: {
                            min: 0, mean: 0, sd: 0, median: 0, max: 0,
                        },
                        total: {
                            min: 0, mean: 0, sd: 0, median: 0, max: 0,
                        },
                    },
                },
            },
            {
                data: `This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        Jetty
Server Hostname:        localhost
Server Port:            8080

Document Path:          /1.txt
Document Length:        2 bytes

Concurrency Level:      5
Time taken for tests:   0.091 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      122000 bytes
HTML transferred:       2000 bytes
Requests per second:    10944.75 [#/sec] (mean)
Time per request:       0.457 [ms] (mean)
Time per request:       0.091 [ms] (mean, across all concurrent requests)
Transfer rate:          1303.96 [Kbytes/sec] received

Connection Times (ms)
                min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       1
Processing:     0    0   0.7      0       9
Waiting:        0    0   0.5      0       9
Total:          0    0   0.7      0      10

Percentage of the requests served within a certain time (ms)
    50%      0
    66%      0
    75%      0
    80%      0
    90%      1
    95%      1
    98%      1
    99%      2
    100%     10 (longest request)`,
                expected: {
                    server: { software: 'Jetty', hostname: 'localhost', port: 8080 },
                    document: { path: '/1.txt', length: 2 },
                    test:
                 {
                     concurencyLevel: 5,
                     timeTaken: 0.091,
                     completeRequests: 1000,
                     failedRequests: 0,
                     totalTransferred: 122000,
                     htmlTransferred: 2000,
                     requestsPerSecond: 10944.75,
                     timePerRequest: 0.091,
                     timePerRequestAll: 0.091,
                     transferRate: 1303.96,
                 },
                    time:
                 {
                     connect: {
                         min: 0, mean: 0, sd: 0.1, median: 0, max: 1,
                     },
                     processing: {
                         min: 0, mean: 0, sd: 0.7, median: 0, max: 9,
                     },
                     waiting: {
                         min: 0, mean: 0, sd: 0.5, median: 0, max: 9,
                     },
                     total: {
                         min: 0, mean: 0, sd: 0.7, median: 0, max: 10,
                     },
                 },
                },
            },
        ];
        testCases.forEach((testCase) => {
            const result = abResult(testCase.data);
            expect(result).to.deep.equal(testCase.expected);
        });
    });
});
