import { createServer } from "node:http";

const server = createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, { "content-type": "text/html" });
      res.write("<h1>Hello !</h1>");
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      res.write("404 - NOT FOUND");
    }
  } else if (req.method === "POST") {
    res.write("Désolé je ne reçois pas de données...");
  }
  res.end();
});

server.listen(8000, "127.0.0.1");
