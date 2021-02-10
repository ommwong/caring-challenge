const http = require('http');
const grpc = require('./client');

const server = http.createServer((req, res) => {
  if (req.url === '/authors') {
    if (req.method === 'GET') grpc.getAuthors(req, res);
    if (req.method === 'POST') grpc.createAuthors(req, res);
  }

  if (req.url === '/books') {
    if (req.method === 'GET') grpc.getBooks(req, res);
  }

  if (req.url === '/awards') {
    if (req.method === 'GET') grpc.getAwards(req, res);
  }

  if (req.url === '/authors-books' && req.method === 'GET') grpc.getAuthorsBooks(req, res);

  if (req.url === '/authors-books-awards' && req.method === 'GET') grpc.getAuthorsBooksAwards(req, res);

  if (req.url === '/authors-awards' && req.method === 'GET') grpc.getAuthorsAwards(req, res);

  if (req.url === '/books-awards' && req.method === 'GET') grpc.getBooksAwards(req, res);


});

const hostname = 'localhost';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});