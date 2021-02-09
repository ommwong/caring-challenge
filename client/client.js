const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { format } = require('path');
const literaryProtoPath = path.join(__dirname, "..", "protos", "literary.proto");
const literaryProtoDefinition = protoLoader.loadSync(literaryProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const literaryPackage = grpc.loadPackageDefinition(literaryProtoDefinition).literaryPackage;

const client = new literaryPackage.LiteraryService(
  "localhost:50051",
  grpc.credentials.createInsecure()
)

// const id = process.argv[1];
// const name = process.argv[2];
// const updatedName = process.argv[3];
const title = process.argv[2];
// const author = process.argv[3];
// const isbn = process.argv[4];
// const bookFormat = process.argv[5];
// const pages = process.argv[6];

function createAuthor () {
  const request = {
    name: name
  };

  client.createAuthor(request, (error, response) => {
    if (!error) {
      console.log('Author created successfully: ', response)
    } else {
      console.error(error);
    }
  })
};

function getAuthors () {
  const request = {};

  client.getAuthors(request, (error, response) => {
    if (!error) {
      console.log('Authors from db: ', response);
    } else {
      console.error(error);
    }
  })
};

function getAuthor () {
  const request = {
    name: name
  };

  client.getAuthor(request, (error, response) => {
    if (!error) {
      console.log('Here is the author: ', response);
    } else {
      console.error(error);
      console.log('Author does not exist!')
    }
  });

};

function updateAuthor () {
  const request = {
    name: name,
    updatedName: updatedName
  };

  client.updateAuthor(request, (error, response) => {
    if (!error) {
      console.log('Successfully updated author', response);
    } else {
      console.error(error);
    }
  })
};

function deleteAuthor () {
  const request = {
    name: name
  };

  client.deleteAuthor(request, (error, response) => {
    if (!error) {
      console.log('Successfully deleted author', response);
    } else {
      console.error(error);
      console.log('Author does not exist');
    }
  })
};

function createBook () {
  const request = {
    title: title,
    author: author,
    ISBN: isbn,
    format: bookFormat,
    pages: pages
  };

  client.createBook(request, (error, response) => {
    if (!error) {
      console.log('Successfully created new book', response);
    } else {
      console.error(error);
      console.log('Book not created');
    }
  })
};

function getBook () {
  const request = {
    title: title,
  };

  client.getBook(request, (error, response) => {
    if (!error) {
      console.log('Here is the book:', response);
    } else {
      console.error(error);
      console.log('Book is not found!');
    }
  })
};

function main() {
  // createAuthor();
  // // getAuthors();
  // // getAuthor();
  //  updateAuthor();
  // deleteAuthor();
  // createBook();
  getBook();
}

main();
