const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const authorAPI = require('./APIs/authorAPI');

const environment = process.env.ENV || 'development';
const config = require('./knexfile')[environment];
const knex = require('knex')(config);

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

function createBook (call, callback) {
  const book = {
    title: call.request.title,
    author: call.request.author,
    isbn: call.request.isbn,
    format: call.request.format,
    pages: call.request.pages,
  }

  knex('books')
    .insert(book)
    .then(() => {
      callback(null, book)
    })
};

function getBooks (call, callback) {
  knex('books')
    .then(data => {
      callback(null, {
        books: data
      })
    })
};

function getBook (call, callback) {
  const book = {
    title: call.request.title
  }

  if (book) {
    knex('books')
      .where(book)
      .then(data => {
        if (data.length) {
          callback(null, data[0]);
        } else {
          callback('The book does not exist');
        }
      })
  }
};


function updateBook (call, callback) {
  const book = {
    title: call.request.title
  };

  knex('books')
    .where(book)
    .update({
      title: call.request.updatedTitle,
      author: call.request.updatedAuthor,
      isbn: call.request.updatedIsbn,
      format: call.request.updatedBookFormat,
      pages: call.request.updatedPages
    })
    .returning()
    .then(data => {
      if (data) {
        callback(null, data)
      } else {
        callback('Book does not exist')
      }
    })
};

function deleteBook (call, callback) {
  const book = {
    title: call.request.title
  };

  knex('books')
    .where(book)
    .delete()
    .returning()
    .then(data => {
      if (data) {
        callback(null, data);
      } else {
        callback('Book does not exist');
      }
    })
};

const server = new grpc.Server();
server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());

//server needs to be told about service
//need service {}
server.addService(literaryPackage.LiteraryService.service, {
  createAuthor: authorAPI.createAuthor,
  getAuthors: authorAPI.getAuthors,
  getAuthor: authorAPI.getAuthor,
  updateAuthor: authorAPI.updateAuthor,
  deleteAuthor: authorAPI.deleteAuthor,
  createBook: createBook,
  getBooks: getBooks,
  getBook: getBook,
  updateBook: updateBook,
  deleteBook: deleteBook
})

server.start();
console.log("Server Running at http://localhost:50051");


