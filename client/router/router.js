const gRPC = require('../client')

const router = (request, response) => {

  if (request.url === '/authors') {
    if (request.method === 'GET') gRPC.getAuthors(request, response);
    if (request.method === 'POST') gRPC.createAuthor(request, response);
    if (request.method === 'DELETE') gRPC.deleteAuthor(request, response);
    if (request.method === 'PUT') gRPC.updateAuthor(request, response);
  };

  if (request.url === '/authors/:name' && request.method === 'GET') gRPC.getAuthor(request, response);


};

module.exports = {
  router
}

//authors
//books
//awards