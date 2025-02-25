const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  if(req.url === "/api/jwt" && req.method === "POST"){
    console.log("TEST")
    res.writeHead(200)
    return res.end(JSON.stringify({"Message": "FSAFAS"}))
  }
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});