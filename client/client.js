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

const createAuthor = (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk.toString());
  });

  req.on('end', () => {
    const { name } = JSON.parse(body);
    const request = { name };

    authorClient.createAuthor(request, (error, response) => {
      try {
        res.writeHead(201, {
          'Content-Type': 'application/json'
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
  });
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

const updateAuthor = (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk.toString());
  });

  req.on('end', () => {
    const { name, updatedName } = JSON.parse(body);
    const request = {
      name: name,
      updatedName: updatedName
    };

    authorClient.updateAuthor(request, (error, response) => {
      try {
        res.writeHead(201, {
          'Content-Type': 'application/json'
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
  });
};

const deleteAuthor = (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk.toString());
  });

  req.on('end', () => {
    const { name } = JSON.parse(body);
    const request = { name };

    authorClient.deleteAuthor(request, (error, response) => {
      try {
        res.writeHead(201, {
          'Content-Type': 'application/json'
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
  });
};

const createBook = (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk.toString());
  });

  req.on('end', () => {
    const { title, author, isbn, format, pages } = JSON.parse(body);
    const request = {
      title: title,
      author: author,
      isbn: isbn,
      format: format,
      pages: pages
    };

    bookClient.createBook(request, (error, response) => {
      try {
        res.writeHead(201, {
          'Content-Type': 'application/json'
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
  });
};

const getBook = (req, res, title) => {
  const request = {
    title: title,
  };

  bookClient.getBook(request, (error, response) => {
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
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk.toString());
  });

  req.on('end', () => {
    const { title, updatedTitle, updatedAuthor, updatedIsbn, updatedBookFormat, updatedPages } = JSON.parse(body);

    const request = {
      title: title,
      updatedTitle: updatedTitle,
      updatedAuthor: updatedAuthor,
      updatedIsbn: updatedIsbn,
      updatedBookFormat: updatedBookFormat,
      updatedPages: updatedPages
    };

    bookClient.updateBook(request, (error, response) => {
      try {
        res.writeHead(201, {
          'Content-Type': 'application/json'
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
  });
};

const deleteBook = (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk.toString());
  });

  req.on('end', () => {
    const { title } = JSON.parse(body);
    const request = {
      title: title
    };

    bookClient.deleteBook(request, (error, response) => {
      try {
        res.writeHead(201, {
          'Content-Type': 'application/json'
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
  });
};

const createAward = (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk.toString());
  });

  req.on('end', () => {
    const { award, author, book, year } = JSON.parse(body);
    const request = {
      award: award,
      author: author,
      book: book,
      year: year
    };

    awardClient.createAward(request, (error, response) => {
      try {
        res.writeHead(201, {
          'Content-Type': 'application/json'
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
  });
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

const getAward = (req, res, award, year) => {
  const request = {
    award: award,
    year: year
  };

  awardClient.getAward(request, (error, response) => {
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

const updateAward = (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk.toString());
  });

  req.on('end', () => {
    const { award, year, updatedAward, updatedAuthor, updatedBook, updatedYear } = JSON.parse(body);

    const request = {
      award: award,
      year: year,
      updatedAward: updatedAward,
      updatedAuthor: updatedAuthor,
      updatedBook: updatedBook,
      updatedYear: updatedYear
    };

    awardClient.updateAward(request, (error, response) => {
      try {
        res.writeHead(201, {
          'Content-Type': 'application/json'
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
  });
};

const deleteAward = (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk.toString());
  });

  req.on('end', () => {
    const { award, year } = JSON.parse(body);
    const request = {
      award: award,
      year: year,
    };

    awardClient.deleteAward(request, (error, response) => {
      try {
        res.writeHead(201, {
          'Content-Type': 'application/json'
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
  });
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