const http = require("http");
const PORT = 3000;

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });
  response.end('{ "message": "Curso de NodeJS" }');
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}, http://localhost:${PORT}`);
});
