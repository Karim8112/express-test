import express from "express";

const config = {
  port: Number(process.env.PORT) || 3000,
  host: "localhost",
};
const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`Request URL: ${req.url}`);
});

app.listen(config.port, config.host, () => {
  console.log(`Server is running at http://${config.host}:${config.port}/`);
});
