import app from "./app.js";
import dotenv from "dotenv";
import { config } from "./constants/core.js";
import MongoConnection from "./mongodb.js";

dotenv.config({ path: "./config.env" });

MongoConnection();

app.listen(config.port, config.host, () => {
  console.log(`App running on port ${config.port}...`);
});
