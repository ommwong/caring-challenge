const http = require('http');
const grpc = require('./client');
const url = require('url');


const server = http.createServer((req, res) => {
  if (req.url === '/authors' && req.method === 'GET') grpc.getAuthors(req, res);

  if (req.url.match(/\/authors\?=([a-zA-Z]+)/) && req.method === 'POST') {
    const name = req.url.split('=')[1].split('%20').join(' ');
    grpc.createAuthor(req, res, name);
  };

  if (req.url === '/authors' && req.method === 'DELETE') grpc.deleteAuthor(req, res);

  if (req.url === '/authors' && req.method === 'PUT') grpc.updateAuthor(req, res);

  if (req.url.match(/\/authors\?=([a-zA-Z]+)/) && req.method === 'GET') {
    const name = req.url.split('=')[1].split('%20').join(' ');
    grpc.getAuthor(req, res, name);
  };



  if (req.url === '/books') {
    if (req.method === 'GET') grpc.getBooks(req, res);
  };

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