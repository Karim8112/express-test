import express from "express";
import { baseURL, config } from "./constants/core.js";
import tourRouterGETAll from "./routes/test/GET_ALL.js";
import tourRouterGET from "./routes/test/GET.js";
import tourRouterPOST from "./routes/test/POST.js";
import tourRouterPATCH from "./routes/test/PATCH.js";
import tourRouterDELETE from "./routes/test/DELETE.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ status: "success", message: "API is running" });
});

app.use(`/${baseURL}`, tourRouterPOST);
app.use(`/${baseURL}`, tourRouterGETAll);
app.use(`/${baseURL}`, tourRouterGET);
app.use(`/${baseURL}`, tourRouterDELETE);
app.use(`/${baseURL}`, tourRouterPATCH);

// Server setup
const port = process.env.PORT || config.port || 3000;
const host = "0.0.0.0"; // Necessary for many cloud deployments

app.listen(Number(port), host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
