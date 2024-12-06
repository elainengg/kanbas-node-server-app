import express from 'express';

import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import ModuleRoutes from "./Kanbas/Modules/routes.js";

// import CourseRoutes from "./Kanbas/Courses/routes.js";

import mongoose from "mongoose";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);


const app = express()
app.use(
    cors({
      credentials: true,
      origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
// console.log(process.env.SESSION_SECRET)
// console.log(process.env.NODE_ENV)
// console.log(process.env.NODE_SERVER_DOMAIN)
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
// CourseRoutes(app);
ModuleRoutes(app);



Hello(app);
Lab5(app);


// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {
//   res.send('Welcome to Full Stack Development!')})
app.listen(process.env.PORT || 4000)