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

const id = process.argv[1];
const name = process.argv[2];

function createAuthor () {
  const request = {
    // id: -1,
    name: name
  }

  client.createAuthor(request, (error, response) => {
    if (!error) {
      console.log('createAuthor response: ', response)
    } else {
      console.error(error)
    }
  })
};

function getAuthors () {
  const request = {};

  client.getAuthors(request, (error, response) => {
    if (!error) {
      console.log('Get authors from server ', response)
    } else {
      console.error(error)
    }
  })
};

function getAuthor () {
  const request = {
    id: id
  };

  client.getAuthor(request, (error, response) => {
    if (!error) {
      console.log("Get author by id: ", response);
    } else {
      console.error(error);
    }
  })

};

function updateAuthor () {};

function main() {
  createAuthor();
  getAuthors();
  getAuthor();
  updateAuthor();
}

main();
