const http = require('http');
const { readFileSync } = require('fs');

// get all files
// const homePage = readFileSync('./index.html');
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');

const server = http.createServer((req, res) => {
    // console.log('user hit the server');
    // console.log(req);
    // console.log(req.method);
    // console.log(req.url);
    // console.log(url);
    const url = req.url;
    // res.writeHead(200, { 'content-type': '"text/plain' });
    // home page
    if (url === '/') {
        res.writeHead(200, { 'content-type': '"text/html' });
        // res.end('home page');
        // res.write('<h1>home page</h1>');
        readFileSync.write(homePage);
        res.end();
        // about page
        // } else if (url === '/about') {
        //     res.writeHead(200, { 'content-type': '"text/html' });
        //     res.write('<h1>about page</h1>');
        //     res.end();
        // }
        // styles
    } else if (url === '/styles.css') {
        res.writeHead(200, { 'content-type': '"text/css' });
        res.write(homeStyles);
        res.end();
    }
    // image/logo
    else if (url === '/logo.svg') {
        res.writeHead(200, { 'content-type': '"image/svg+xml' });
        res.write(homeImage);
        res.end();
    }
    // logic
    else if (url === '/browser-app.js') {
        res.writeHead(200, { 'content-type': 'text/javascript' });
        res.write(homeImage);
        res.end();
    }
    // 404
    else {
        res.writeHead(404, { 'content-type': '"text/html' });
        res.write('<h1>page not found</h1>');
        res.end();
    }
});

server.listen(5000);
