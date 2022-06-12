const http = require('http')

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html');

  response.statusCode = 200;

  const { url, method } = request;

  if (url === '/') {
    if(method === 'GET') {
      response.end('<h1>Ini adalah homepage</h1>');
    }

    response.end(`<h1>Halaman tidak dapat diakses dengan method ${method} </h1>`);
  } 
  else if (url === '/about') {
    if (method === 'GET') {
      response.end('Halo! Ini adalah halaman about');
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
        response.end(`<h1>Hai, ${name}! Ini adalah halaman about</h1>`);
      });
    } else {
      response.end(`Halaman tidak bisa diakses menggunakan method ${method}`);
    }
  } else {
    response.end('<h1>Halaman tidak ditemukan</h1>');
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});