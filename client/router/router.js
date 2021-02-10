const gRPC = require('../client')

const router = (request, response) => {

  if (request.url === '/authors') {
    if (request.method === 'GET') gRPC.getAuthors;
    if (request.method === 'POST') gRPC.createAuthor;
    if (request.method === 'DELETE') gRPC.deleteAuthor;
    if (request.method === 'PUT') gRPC.updateAuthor;
  }

  if (request.url === '/authors/:name' && request.method === 'GET') gRPC.getAuthor;

};

module.exports = {
  router
}

//authors
//books
//awards