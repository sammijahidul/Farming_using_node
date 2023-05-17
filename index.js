const fs = require('fs');
const http = require('http');
const url = require('url');

const PORT = 5000;

// replaceTemplate function to match with front-end placeholder 
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

// Read front-end file template  
const tempOverview = fs.readFileSync(`${__dirname}/views/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/views/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/views/product.html`, 'utf-8');

// Reading data from data.json file
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);
   
    // const pathName = req.url;

    // Overview route
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output);
    } 
    // Product route
    else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    //  api routes
    else if (pathname === '/api') {
        fs.readFile(`${__dirname}/data/data.json`, 'utf-8', (err, data) => {
                const productData = JSON.parse(data);
                res.writeHead(200, {'Content-type': 'application/json'});
                res.end(data);
            })            
        }
       else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1> Page not found </h1>');
       } 
})

server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});