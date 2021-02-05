const grpc = require('grpc'); //grpc library
const protoLoader = require('@grpc/proto-loader'); //compiles proto into JS, etc.

const PROTO_PATH = "./literary.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});

//load packageDefinition into grpc object
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const literaryPackage = grpcObject.literaryPackage;

const server = new grpc.Server();

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

//uses http2 as transport mechanism; needs credentials; bypasses credentials with createInsecure
//communicate service with server
server.addService(literaryPackage.AuthorService.service, {
  "createAuthor": createAuthor,
  "getAuthors": getAuthors,
  "editAuthor": editAuthor,
  "deleteAuthor": deleteAuthor
});

server.bind('localhost:4000', grpc.ServerCredentials.createInsecure());
console.log("Server running at http://localhost:4000");
server.start();
