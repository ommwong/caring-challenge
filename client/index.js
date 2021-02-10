const http = require('http');

const router = require('./router/router');

const server = http.createServer((request, response) => {
  bodyParser(request, response, router)
});

const bodyParser = (request, response, next) => {
  if (request.body === 'POST') {
    const body = [];
    request.on('data', (chunk) => body.push(chunk));
    request.on('end', () => {
      request.body = JSON.parse(Buffer.concat(body));
      next(request, response);
    })
  } else {
    next(request, response);
  }
};

const hostname = 'localhost';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});