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

const client = new literaryPackage.AuthorService("localhost:50051",
        grpc.credentials.createInsecure()
)

const first_name = process.argv[2];
const last_name = process.argv[3];

function createAuthor () {
  const request = {
    id: -1,
    first_name: first_name,
    last_name: last_name
  }

  client.createAuthor(request, (error, response) => {
    if (!error) {
      console.log('Response: ', response)
    } else {
      console.error(error)
    }
  })
}

function getAuthors () {
  const request = {};

  client.getAuthors(request, (error, response) => {
    if (!error) {
      console.log('Response: ', response)
    } else {
      console.error(error)
    }
  })
}

function main() {
  createAuthor();
  getAuthors();
}

main();
