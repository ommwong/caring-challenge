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

const client = new literaryPackage.LiteraryService(
  "localhost:50051",
  grpc.credentials.createInsecure()
)

const award = process.argv[2];
const author = process.argv[3];
const book = process.argv[4];
const year = process.argv[5];

// const name = process.argv[2];

// const title = process.argv[2];
// const author = process.argv[3];
// const isbn = process.argv[4];
// const bookFormat = process.argv[5];
// const pages = process.argv[6]


// const updatedTitle = process.argv[3];
// const updatedAuthor = process.argv[4];
// const updatedIsbn = process.argv[5];
// const updatedBookFormat = process.argv[6];
// const updatedPages = process.argv[7];

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
    isbn: isbn,
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

function getBooks () {
  const request = {};

  client.getBooks(request, (error, response) => {
    if (!error) {
      console.log('Books from db: ', response);
    } else {
      console.error(error);
    }
  })
};

function updateBook () {
  const request = {
    title: title,
    updatedTitle: updatedTitle,
    updatedAuthor: updatedAuthor,
    updatedIsbn: updatedIsbn,
    updatedBookFormat: updatedBookFormat,
    updatedPages: updatedPages
  };

  client.updateBook(request, (error, response) => {
    if (!error) {
      console.log('Successfully updated book', response);
    } else {
      console.error(error);
    }
  })
};

function deleteBook () {
  const request = {
    title: title
  };

  client.deleteBook(request, (error, response) => {
    if (!error) {
      console.log('Successfully deleted book', response);
    } else {
      console.error(error);
      console.log('Book does not exist');
    }
  })
};

function createAward () {
  const request = {
    award: award,
    author: author,
    book: book,
    year: year
  };

  client.createAward(request, (error, response) => {
    if (!error) {
      console.log('Award created successfully: ', response)
    } else {
      console.error(error);
    }
  })
};

function getAwards () {
  const request = {};

  client.getAwards(request, (error, response) => {
    if (!error) {
      console.log('Awards from db: ', response);
    } else {
      console.error(error);
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
  // getBook();
  // getBooks();
  // updateBook();
  // deleteBook();
  // createAward();
  getAwards();
}

main();
