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

const authorClient = new literaryPackage.AuthorService(
  "localhost:50051",
  grpc.credentials.createInsecure()
)

const bookClient = new literaryPackage.BookService(
  "localhost:50051",
  grpc.credentials.createInsecure()
)

const awardClient = new literaryPackage.AwardService(
  "localhost:50051",
  grpc.credentials.createInsecure()
)

// const award = process.argv[2];
// const year = process.argv[3];
// const updatedAward = process.argv[4];
// const updatedAuthor = process.argv[5];
// const updatedBook = process.argv[6];
// const updatedYear = process.argv[7];

function createAuthor () {
  const request = {
    name: name
  };

  authorClient.createAuthor(request, (error, response) => {
    if (!error) {
      console.log('Author created successfully: ', response)
    } else {
      console.error(error);
    }
  })
};

function getAuthors () {
  const request = {};

  authorClient.getAuthors(request, (error, response) => {
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

  authorClient.getAuthor(request, (error, response) => {
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

  authorClient.updateAuthor(request, (error, response) => {
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

  authorClient.deleteAuthor(request, (error, response) => {
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

  bookClient.createBook(request, (error, response) => {
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

  bookClient.getBook(request, (error, response) => {
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

  bookClient.getBooks(request, (error, response) => {
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

  bookClient.updateBook(request, (error, response) => {
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

  bookClient.deleteBook(request, (error, response) => {
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

  awardClient.createAward(request, (error, response) => {
    if (!error) {
      console.log('Award created successfully: ', response)
    } else {
      console.error(error);
    }
  })
};

function getAwards () {
  const request = {};

  awardClient.getAwards(request, (error, response) => {
    if (!error) {
      console.log('Awards from db: ', response);
    } else {
      console.error(error);
    }
  })
};

function getAward () {
  const request = {
    award: award,
    year: year
  };

  awardClient.getAward(request, (error, response) => {
    if (!error) {
      console.log('Here is the award:', response);
    } else {
      console.error(error);
      console.log('Award is not found!');
    }
  })
};

function updateAward () {
  const request = {
    award: award,
    year: year,
    updatedAward: updatedAward,
    updatedAuthor: updatedAuthor,
    updatedBook: updatedBook,
    updatedYear: updatedYear
  };

  awardClient.updateAward(request, (error, response) => {
    if (!error) {
      console.log('Successfully updated award', response);
    } else {
      console.error(error);
    }
  })
};

function deleteAward () {
  const request = {
    award: award,
    year: year
  };

  awardClient.deleteAward(request, (error, response) => {
    if (!error) {
      console.log('Successfully deleted award', response);
    } else {
      console.error(error);
      console.log('Award does not exist');
    }
  })
};

function getAuthorsBooks () {
  const request = {};

  authorClient.getAuthorsBooks(request, (error, response) => {
    if (!error) {
      console.log('Authors with books:', response);
    } else {
      console.error(error);
      console.log('Oops');
    }
  })
}

(function () {
  // createAuthor();
  // getAuthors();
  // getAuthor();
  //  updateAuthor();
  // deleteAuthor();
  // createBook();
  // getBook();
  // getBooks();
  // updateBook();
  // deleteBook();
  // createAward();
  // getAwards();
  // getAward()
  // updateAward()
  // deleteAward()
  getAuthorsBooks()
})();

