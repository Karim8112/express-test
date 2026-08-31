import express from "express";
import { baseURL, config } from "./constants/core.js";
import tourRouterGETAll from "./routes/test/GET_ALL.js";
import tourRouterGET from "./routes/test/GET.js";
import tourRouterPOST from "./routes/test/POST.js";
import tourRouterPATCH from "./routes/test/PATCH.js";
import tourRouterDELETE from "./routes/test/DELETE.js";
const app = express();

// middleware
app.use(express.json());
app.use(`/${baseURL}`, tourRouterPOST);
app.use(`/${baseURL}`, tourRouterGETAll);
app.use(`/${baseURL}`, tourRouterGET);
app.use(`/${baseURL}`, tourRouterGET);
app.use(`/${baseURL}`, tourRouterDELETE);
app.use(`/${baseURL}`, tourRouterPATCH);

// app.listen(config.port, config.host, () => {
//   console.log(`App running on port ${config.port}...`);
// });
