const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { v4: uuidv4 } = require("uuid");

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
    id: uuidv4(),
    name: call.request.name
  }
  authors.push(author);

  callback(null, author);
};

function getAuthors(call, callback) {
  // callback(null, {
  //   authors: authors
  // })

  console.log('Received authors from db:');
  knex('authors')
    .then(data => {
      callback(null, {
        authors: data
      })
    })
};

function getAuthor(call, callback) {
  let author = authors.find(author => author.id == call.request.id);

  if (author) {
    callback(null, author);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Author not found"
    })
  }
};

function updateAuthor(call, callback) {
  let author = authors.find(author => author.id == call.request.id);

  if (author) {
    author.name = call.request.name;
    callback(null, author);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Author not found"
    })
  }
};

function deleteAuthor(call, callback) {};

const server = new grpc.Server();
server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());

//server needs to be told about service
//need service {}
server.addService(literaryPackage.AuthorService.service, {
  createAuthor: createAuthor,
  getAuthors: getAuthors,
  getAuthor: getAuthor,
  updateAuthor: updateAuthor,
  deleteAuthor: deleteAuthor
})

server.start();
console.log("Server Running at http://localhost:50051");


