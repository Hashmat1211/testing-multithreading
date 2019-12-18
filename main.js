const perf = require('execution-time')();
perf.start();
const fs = require('fs-extra');
const http = require('http');


const hostname = '127.0.0.1';
const { getRandomIndex } = require('./utils/index')
const firstName = require('./data/first_name.json');
const middleName = require('./data/middle_name.json');
const lastName = require('./data/last_name');

const limit = 1000000;
const outputFile = `${__dirname}/output/data.txt`;



(async () => {

    for (let i = 0; i < limit; i++) {
        const data = [firstName, middleName, lastName]
            .map(getRandomIndex)
            .concat('\n')
            .join();

        await fs.appendFile(outputFile, data)
        if (i == limit - 1) {

            const results = perf.stop();
            console.log("result ", results.time);
        }
    }

})();



const port = 6000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

