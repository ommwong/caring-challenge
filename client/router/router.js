const gRPC = require('../client')

const router = (request, response) => {

  //==> author endpoints
  if (request.url === '/authors') {
    if (request.method === 'GET') gRPC.getAuthors(request, response);
    if (request.method === 'POST') gRPC.createAuthor(request, response);
    if (request.method === 'DELETE') gRPC.deleteAuthor(request, response);
    if (request.method === 'PUT') gRPC.updateAuthor(request, response);
  };

  if (request.url === '/authors/:name' && request.method === 'GET') gRPC.getAuthor(request, response);

  //==> book endpoints

  if (request.url === '/books') {
    if (request.method === 'GET') gRPC.getBooks(request, response);
    if (request.method === 'POST') gRPC.createBook(request, response);
    if (request.method === 'DELETE') gRPC.deleteBook(request, response);
    if (request.method === 'PUT') gRPC.updateBook(request, response);
  };

  if (request.url === '/books/:title' && request.method === 'GET') gRPC.getBook(request, response);

  //==> award endpoints

  if (request.url === '/awards') {
    if (request.method === 'GET') gRPC.getAwards(request, response);
    if (request.method === 'POST') gRPC.createAward(request, response);
    if (request.method === 'DELETE') gRPC.deleteAward(request, response);
    if (request.method === 'PUT') gRPC.updateAward(request, response);
  };

  if (request.url === '/awards/:title/:year' && request.method === 'GET') gRPC.getAward(request, response);

  //==> query endpoints
  if (request.url === '/authors-books' && request.method === 'GET') gRPC.getAuthorsBooks(request, response);

  if (request.url === '/authors-books-awards' && request.method === 'GET') gRPC.getAuthorsBooksAwards(request, response);

  if (request.url === '/authors-awards' && request.method === 'GET') gRPC.getAuthorsAwards(request, response);

  if (request.url === '/books-awards' && request.method === 'GET') gRPC.getBooksAwards(request, response);

};

module.exports = {
  router
}
