const http = require('http');

const parseCookies = (cookieHeader) => {
    const cookies = {};
    cookieHeader && cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        cookies[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return cookies;
};

const server = http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (cookies.name && cookies.email) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Authenticated user: ${cookies.name} (${cookies.email})`);
    } else {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('No cookies found, user not authenticated');
    }
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
