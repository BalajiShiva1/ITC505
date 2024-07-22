const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const parseCookies = (cookieHeader) => {
    const cookies = {};
    cookieHeader && cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        cookies[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return cookies;
};

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            fs.readFile('index.html', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        } else if (req.url === '/statusCodes.html') {
            fs.readFile('statusCodes.html', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page Not Found');
        }
    } else if (req.method === 'POST' && req.url === '/set-cookies') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            const { name, email } = parsedBody;
            res.writeHead(200, {
                'Set-Cookie': [
                    `name=${name}; HttpOnly`, 
                    `email=${email}; HttpOnly`
                ],
                'Content-Type': 'text/plain'
            });
            res.end('Cookies have been set');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
