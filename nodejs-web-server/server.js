const http = require('http')

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html');

  response.statusCode = 200;

  const { method } = request;

  if(method === 'GET') {
    response.end('<h1>Hello!</h1>');
  }

  if(method === 'POST') {
    let body = [];

    // to retrieve the request
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // cast the request then store it to body
    request.on('end', () => {
      body = Buffer.concat(body).toString();
      const { name } = JSON.parse(body); // to cast the json string to js object 
      response.end(`<h1>Hai, ${name}!</h1>`);
    });
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});