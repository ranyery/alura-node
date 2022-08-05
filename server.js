const http = require("http");
const PORT = 3000;

const routes = {
  GET: {
    "/": "GET Curso de NodeJS",
    "/livros": "GET Curso de NodeJS",
  },
  POST: {
    "/": "POST Curso de NodeJS",
    "/livros": "POST Curso de NodeJS",
  },
};

const server = http.createServer((request, response) => {
  console.log(request);
  response.writeHead(200, {
    "Content-Type": "application/json",
  });
  response.end(routes[request.method][request.url]);
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}, http://localhost:${PORT}`);
});
