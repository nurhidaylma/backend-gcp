const http = require('http')

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Powered-By', 'NodeJS');

  const { url, method } = request;

  if (url === '/') {
    if(method === 'GET') {
      response.statusCode = 200;
      response.end(JSON.stringify({
        message: 'Ini adalah homepage',
      }));
    } else {
      response.statusCode = 400;
      response.end(JSON.stringify({
        message: `Halaman tidak dapat diakses dengan method ${method}`,
      }))
    }
  } 
  else if (url === '/about') {
    if (method === 'GET') {
      response.statusCode = 200;
      response.end(JSON.stringify({
        message: 'Halo! Ini adalah halaman about',
      }))
    } 
    else if(method === 'POST') {
      let body = [];

      // to retrieve the request
      request.on('data', (chunk) => {
        body.push(chunk);
      });

      // cast the request then store it to body
      request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body); // to cast the json string to js object 
        response.statusCode = 200;
        response.end(JSON.stringify({
          message: `Hai, ${name}! Ini adalah halaman about`,
        }));
      });
    } else {
      response.statusCode = 400;
      response.end(JSON.stringify({
        message: `Halaman tidak bisa diakses menggunakan method ${method}`,
      }))
    }
  } else {
    response.statusCode = 404;
    response.end(JSON.stringify({
      message: 'Halaman tidak ditemukan',
    }))
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});