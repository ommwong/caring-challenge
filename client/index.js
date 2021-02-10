const http = require('http');
const { getAuthors } = require('./client');

const server = http.createServer((req, res) => {
  if (req.url === '/authors' && req.method === 'GET') {
    getAuthors(req, res)
  }
});

const hostname = 'localhost';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});