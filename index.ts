import express from "express";

// import fs from "fs";
const config = {
  port: 3000,
  host: "localhost",
};

const app = express();

// // home page route
app.get("/", (req: express.Request, res: express.Response) => {
  // superagent
  //   .get("https://dummyjson.com/recipes")
  //   .then((response) => {
  //     if (response.status !== 200) {
  //       res.status(response.status).send("Error fetching data");
  //       return;
  //     }
  //     console.log("Response body:", response.body.recipes);
  //     res.json(response.body);
  //     // res.end("test");
  //   })
  //   .catch((error) => {
  //     res.status(404).end("Error fetching data");
  //     res.json({ error: "Error fetching data", details: error.message });
  //   });
  res.json({ test: "test" });
});

app.listen(config.port, config.host, () => {
  console.log(`Server is running on http://${config.host}:${config.port}`);
});

app.get("/about", (req, res) => {
  res.json({ test: "test" });
});

// app.use(express.static("static"));

// // this is the main entry point of the application, it starts the server and listens for incoming requests on the specified port and host. When the server is successfully started, it logs a message to the console indicating that the server is running and provides the URL where it can be accessed.
// app.listen(config.port, config.host, () => {
//   console.log(`Server is running at http://${config.host}:${config.port}/`);
// });

// console.log("write this first");

// import http from "http";

// const server = http.createServer((req, res) => {
//   const baseURL = `http://${req.headers.host}`;

//   // 2. Parse the URL using the modern WHATWG API
//   const parsedUrl = new URL(req.url || "/", baseURL);
//   const path = parsedUrl.pathname;
//   if (path === "/") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Welcome to the home page!");
//   } else if (path === "/about") {
//     const query = parsedUrl.searchParams;

//     console.log("Query parameters:", query);
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("about page");
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("404 not found");
//     // res.writeHead(404, { "Content-Type": "application/json" });
//     // res.end(JSON.stringify({ error: "Page not found" }));
//   }
// });
