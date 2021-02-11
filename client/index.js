const http = require('http');
const grpc = require('./client');

const authorsParams = /\/authors\/([a-zA-Z]+)/;

const server = http.createServer((req, res) => {

  //FIX GET BY AUTHOR AND BOOK ROUTES

  //AUTHOR ROUTES=>

  if (req.url === '/authors') {
    if (req.method === 'GET') grpc.getAuthors(req, res);
    if (req.method === 'POST') grpc.createAuthor(req, res);
    if (req.method === 'DELETE') grpc.deleteAuthor(req, res);
    if (req.method === 'PUT') grpc.updateAuthor(req, res);
  };

  if (req.url.match(authorsParams) && req.method === 'GET') {
    const name = req.url.split('/')[2].split('%20').join(' ');
    grpc.getAuthor(req, res, name);
  };

  // //BOOKS ROUTES =>

  if (req.url === '/books') {
    if (req.method === 'GET') grpc.getBooks(req, res);
    if (req.method === 'POST') grpc.createBook(req, res);
    if (req.method === 'DELETE') grpc.deleteBook(req, res);
    if (req.method === 'PUT') grpc.updateBook(req, res);
  };


  // if (req.url.match(booksParams) && req.method === 'POST') {
  //   const url = req.url.split('/');
  //   const title = url[2];
  //   const author = url[3];
  //   const isbn = url[4];
  //   const bookFormat = url[5];
  //   const pages = url[6];
  //   grpc.createBook(req, res, title, author, isbn, bookFormat, pages);
  // };

  // if (req.url.match(/\/books\/([a-zA-Z]+)/) && req.method === 'DELETE') {
  //   const title = req.url.split('/')[2].split('%20').join(' ');
  //   grpc.deleteBook(req, res, title)
  // };

  // if (req.url.match(/\/books\/([a-zA-Z]+)/) && req.method === 'GET') {
  //   const title = req.url.split('/')[2].split('%20').join(' ');
  //   grpc.getBook(req, res, title)
  // };

  // if (req.url === '/awards') {
  //   if (req.method === 'GET') grpc.getAwards(req, res);
  // }

  // if (req.url === '/authors-books' && req.method === 'GET') grpc.getAuthorsBooks(req, res);

  // if (req.url === '/authors-books-awards' && req.method === 'GET') grpc.getAuthorsBooksAwards(req, res);

  // if (req.url === '/authors-awards' && req.method === 'GET') grpc.getAuthorsAwards(req, res);

  // if (req.url === '/books-awards' && req.method === 'GET') grpc.getBooksAwards(req, res);


});

const hostname = 'localhost';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});