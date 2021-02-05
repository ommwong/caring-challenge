const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('literary.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const literaryPackage = grpcObject.literaryPackage;

const server = new grpc.Server();

//uses http2 as transport mechanism; needs credentials; bypasses credentials with createInsecure
server.bind('localhost:4000', grpc.ServerCredentials.createInsecure());

//communicate service with server
server.addService(literaryPackage.AuthorService.service, {
  "createAuthor": createAuthor,
  "getAuthors": getAuthors,
  "editAuthor": editAuthor,
  "deleteAuthor": deleteAuthor
});

server.start();

//call = {}; not an actual request, a whole call
//callback = sends response to client
const createAuthor = (call, callback) => {
  console.log(call)
};

const getAuthors = (call, callback) => {

};

const editAuthor = (call, callback) => {

};

const deleteAuthor = (call, callback) => {

};