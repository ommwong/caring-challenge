const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const authorAPI = require('./APIs/authorAPI');
const bookAPI = require('./APIs/bookAPI');
const awardAPI = require('./APIs/awardAPI');

const path = require('path');
const literaryProtoPath = path.join(__dirname, "..", "protos", "literary.proto");

const literaryProtoDefinition = protoLoader.loadSync(literaryProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const literaryPackage = grpc.loadPackageDefinition(literaryProtoDefinition).literaryPackage;


const server = new grpc.Server();
server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());

server.addService(literaryPackage.AuthorService.service, {
  createAuthor: authorAPI.createAuthor,
  getAuthors: authorAPI.getAuthors,
  getAuthor: authorAPI.getAuthor,
  updateAuthor: authorAPI.updateAuthor,
  deleteAuthor: authorAPI.deleteAuthor,
  getAuthorsBooks: authorAPI.getAuthorsBooks,
  getAuthorsBooksAwards: authorAPI.getAuthorsBooksAwards,
  getAuthorsAwards: authorAPI.getAuthorsAwards
})

server.addService(literaryPackage.BookService.service, {
  createBook: bookAPI.createBook,
  getBooks: bookAPI.getBooks,
  getBook: bookAPI.getBook,
  updateBook: bookAPI.updateBook,
  deleteBook: bookAPI.deleteBook,
  getBooksAwards: bookAPI.getBooksAwards
})

server.addService(literaryPackage.AwardService.service, {
  createAward: awardAPI.createAward,
  getAwards: awardAPI.getAwards,
  getAward: awardAPI.getAward,
  updateAward: awardAPI.updateAward,
  deleteAward: awardAPI.deleteAward
})

server.start();
console.log("Server Running at http://localhost:50051");


