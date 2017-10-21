# ab-result

[![Build Status](https://travis-ci.org/aquilax/ab-result.svg?branch=master)](https://travis-ci.org/aquilax/ab-result) [![Try ab-result on RunKit](https://badge.runkitcdn.com/ab-result.svg](https://npm.runkit.com/ab-result)

Apache Benchmark result parser

## Installation

```bash
npm install --save ab-result
```

## Usage

```js
const abResult = require('ab-result');

const data  = `This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
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
Total:          0    0   0.0      0       0`;

const result = abResult(data);
console.log(result);
```
