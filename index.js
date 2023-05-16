const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 5000;

// Read front-end file template  
const tempOverview = fs.readFileSync(`${__dirname}/views/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/views/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/views/product.html`, 'utf-8');

// Reading data from data.json file
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    // creating routes
    const pathName = req.url;

    if( pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(tempOverview);
    }
    else if (pathName === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(tempProduct);
    }
    else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end("This page is not found")
    }


})


server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});