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

const createAuthor = (req, res, name) =>{
  const request = {
    name: name
  };

  authorClient.createAuthor(request, (error, response) => {
    try {
      res.writeHead(201, {
        'Content-type': 'application/json'
      });
      return res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
    }
  })
};

const getAuthors = (req, res) => {
  authorClient.getAuthors({}, (error, response) => {
    try {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
    }
  })
};

const getAuthor = (req, res, name) => {
  const response = {
    name: name
  }

  authorClient.getAuthor(response, (error, response) => {
    try {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
    }
  });

};

const updateAuthor = (req, res, name, updatedName) => {
  const request = {
    name: name,
    updatedName: updatedName
  };

  authorClient.updateAuthor(request, (error, response) => {
    try {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
    }
  })
};

const deleteAuthor = (req, res, name) => {
  const request = {
    name: name
  };

  authorClient.deleteAuthor(request, (error, response) => {
    try {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
    }
  })
};

const createBook = (req, res) => {
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

const getBook = (req, res) => {
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

const getBooks = (req, res) => {
  bookClient.getBooks({}, (error, response) => {
    try {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
    }
  })
};

const updateBook = (req, res) => {
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

const deleteBook = (req, res) => {
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

const createAward = (req, res) => {
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

const getAwards = (req, res) => {
  awardClient.getAwards({}, (error, response) => {
    try {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
    }
  })
};

const getAward = (req, res) => {
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

const updateAward = (req, res) => {
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

const deleteAward = (req, res) => {
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

const getAuthorsBooks = (req, res) => {
  authorClient.getAuthorsBooks({}, (error, response) => {
    try {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
    }
  })
}

const getAuthorsBooksAwards = (req, res) => {
  authorClient.getAuthorsBooksAwards({}, (error, response) => {
    try {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
    }
  })
}

const getAuthorsAwards = (req, res) => {
  authorClient.getAuthorsAwards({}, (error, response) => {
    try {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
    }
  })
}

const getBooksAwards = (req, res) => {
  bookClient.getBooksAwards({}, (error, response) => {
    try {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify(response));
    } catch {
      res.writeHead(404, {
        'Content-type': 'application/json'
      });
      res.end(JSON.stringify({
        message: 'Route not found'
      }));
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
  // getAuthorsBooks();
  // getAuthorsBooksAwards()
  // getAuthorsAwards()
  // getBooksAwards()
})();

module.exports = {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorsBooks,
  getAuthorsBooksAwards,
  getAuthorsAwards,
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  getBooksAwards,
  createAward,
  getAwards,
  getAward,
  updateAward,
  deleteAward,
}