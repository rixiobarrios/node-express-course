// 12-http.js. This program should use the built-in http module to create a simple web server that listens on port 3000. This is done with the createServer function. You pass it a callback function that checks the request variable (req) for the current url property, and depending on what the URL is, sends back a message to the browser screen. Then have your code listen on port 3000, run this file with the node command, and test it from your browser, by navigating to http://localhost:3000. You can look at 12-http.js for the instructor’s answer (except that program listens on 5000). You will need to type in Ctrl+c (the Ctrl key plus the letter “C” at the same time; or for Mac the Cmd key plus the letter “C” at the same time) to exit your program.

const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    if (req.url === '/') {
        res.end('Welcome to our website!');
    } else if (req.url === '/about') {
        res.end('About us');
    } else {
        res.end(`
    <h1>Oops!</h1>
    <p>Your page is not found</p>
    <a href="/">Back home</a>
    `);
    }
});

server.listen(3000);
console.log('The server is listening on port 3000.');
