const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
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

//call => TCP connection
//callback => sending info back to server
const authors = []

function createAuthor(call, callback) {
  const author = {
    id: authors.length + 1,
    first_name: call.request.first_name,
    last_name: call.request.last_name
  }
  authors.push(author);

  callback(null, author);
}

function getAuthors(call, callback) {
  callback(null, {
    "authors": authors
  })
}

const server = new grpc.Server();
server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());

//server needs to be told about service
//need service {}
server.addService(literaryPackage.AuthorService.service, {
  createAuthor: createAuthor,
  getAuthors: getAuthors
})

server.start();
console.log("Server Running at http://localhost:50051");
