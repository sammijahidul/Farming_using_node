const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 5000;

const server = http.createServer((req, res) => {

    // creating routes
    const pathName = req.url;

    if( pathName === '/' || pathName === '/overview') {
        res.end('This is Home Page');
    }
    else if (pathName === '/product') {
        res.end('This is product page');
    }
    else if (pathName === '/api') {
        res.end('This is api page');
    }
    else {
        res.end('Page Not Found')
    }


})


server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});