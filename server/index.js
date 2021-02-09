const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
// const { v4: uuidv4 } = require("uuid");

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

const authors = []

//constructing API here =>
function createAuthor(call, callback) {
  const author = {
    // id: uuidv4(),
    name: call.request.name
  }

  knex('authors')
    .insert(author)
    .then(() => {
      callback(null, author)
    })
};

function getAuthors(call, callback) {
  knex('authors')
    .then(data => {
      callback(null, {
        authors: data
      })
    })
};

function getAuthor(call, callback) {
  const author = {
    name: call.request.name
  }

  if (author) {
    knex('authors')
      .where(author)
      .then(data => {
        if (data.length) {
          callback(null, data[0]);
        } else {
          callback('The author does not exist');
        }
      })
  }
};

function updateAuthor(call, callback) {
  const author = {
    name: call.request.name
  };

  knex('authors')
    .where(author)
    .update({
      name: call.request.updatedName
    })
    .returning()
    .then(data => {
      if (data) {
        callback(null, data)
      } else {
        callback('Author does not exist')
      }
    })
};

function deleteAuthor(call, callback) {
  const author = {
    name: call.request.name
  };

  knex('authors')
    .where(author)
    .delete()
    .returning()
    .then(data => {
      if (data) {
        callback(null, data);
      } else {
        callback('Author does not exist');
      }
    })
};

function createBook (call, callback) {
  const book = {
    title: call.request.title,
    author: call.request.author,
    ISBN: call.request.isbn,
    format: call.request.format,
    pages: call.request.pages,
  }

  knex('books')
    .insert(book)
    .then(() => {
      callback(null, book)
    })
};

function getBooks (call, callback) {};

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


function updateBook (call, callback) {};
function deleteBook (call, callback) {};

const server = new grpc.Server();
server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());

//server needs to be told about service
//need service {}
server.addService(literaryPackage.LiteraryService.service, {
  createAuthor: createAuthor,
  getAuthors: getAuthors,
  getAuthor: getAuthor,
  updateAuthor: updateAuthor,
  deleteAuthor: deleteAuthor,
  createBook: createBook,
  getBooks: getBooks,
  getBook: getBook,
  updateBook: updateBook,
  deleteBook: deleteBook
})

server.start();
console.log("Server Running at http://localhost:50051");


