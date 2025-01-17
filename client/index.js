const http = require('http');
const grpc = require('./client');

const authorsParams = /\/authors\/([a-zA-Z]+)/;
const booksParams = /\/books\/([a-zA-Z]+)/;
const awardsParams = /\/awards\/([a-zA-Z]+)/;

const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

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

  if (req.url.match(booksParams) && req.method === 'GET') {
    let title = req.url.split('/')[2];

    title.includes('%20') ? title = title.split('%20').join(' ') : title = title;

    grpc.getBook(req, res, title)
  };

  // //AWARDS ROUTES =>

  if (req.url === '/awards') {
    if (req.method === 'GET') grpc.getAwards(req, res);
    if (req.method === 'POST') grpc.createAward(req, res);
    if (req.method === 'DELETE') grpc.deleteAward(req, res);
    if (req.method === 'PUT') grpc.updateAward(req, res);
  };

  if (req.url.match(awardsParams) && req.method === 'GET') {
    const url = req.url.split('/');
    let award = url[2];

    award.includes('%20') ? award = award.split('%20').join(' ') : award = award;

    const year = url[3];

    grpc.getAward(req, res, award, year)
  };

  // //QUERY ROUTES =>

  if (req.url === '/authors-books' && req.method === 'GET') grpc.getAuthorsBooks(req, res);

  if (req.url === '/authors-books-awards' && req.method === 'GET') grpc.getAuthorsBooksAwards(req, res);

  if (req.url === '/authors-awards' && req.method === 'GET') grpc.getAuthorsAwards(req, res);

  if (req.url === '/books-awards' && req.method === 'GET') grpc.getBooksAwards(req, res);

});

const hostname = 'localhost';
const port = 4000;

server.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});