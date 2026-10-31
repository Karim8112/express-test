import express from "express";
import { baseURL } from "./constants/core.js";
import cors from "cors";
// middlewares

// routes
// import tourRouter from "./routes/Tour.js";
import TeamRouter from "./routes/Team.js";
import ProjectRouter from "./routes/Project.js";
import AuthRouter from "./routes/Auth.js";
import VideoRouter from "./routes/Video.js";
import ProjectTypeRouter from "./routes/ProjectType.js";
//
import HeroRouter from "./routes/Landing/hero.js";
import WhatWeDo from "./routes/Landing/whatWeDo.js";
import AdditionalSection from "./routes/Landing/additionalSection.js";
import AboutUs from "./routes/Landing/aboutUs.js";
import List from "./routes/Landing/list.js";
import ContactInfo from "./routes/Landing/contactInfo.js";
//
import LandingPage from "./routes/Landing/_all_Landing.js";

const app = express();
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// this is amir
// app.options("*", cors());
//-------- general middleware -------------
// npm middlewares
app.use(express.json());
app.use(express.json({ limit: `50mb` }));
app.use(express.urlencoded({ extended: true, limit: `50mb` }));
app.use(express.static("static"));

// custom middlewares

// -------- routing middleware -------------

app.use(`/${baseURL}`, AuthRouter);
app.use(`/${baseURL}`, TeamRouter);
app.use(`/${baseURL}`, ProjectRouter);
app.use(`/${baseURL}`, VideoRouter);
app.use(`/${baseURL}`, ProjectTypeRouter);
app.use(`/${baseURL}`, HeroRouter);
app.use(`/${baseURL}`, WhatWeDo);
app.use(`/${baseURL}`, AdditionalSection);
app.use(`/${baseURL}`, AboutUs);
app.use(`/${baseURL}`, List);
app.use(`/${baseURL}`, ContactInfo);
//
app.use(`/${baseURL}`, LandingPage);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
});

export default app;
