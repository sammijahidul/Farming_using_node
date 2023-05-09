const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 5000;

const server = http.createServer((req, res) => {
    res.end("this is server")
})

server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});