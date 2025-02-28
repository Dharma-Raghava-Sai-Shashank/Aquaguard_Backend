import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "100kb",
  })
);
// console.log("aaya hu app.js ");

app.use(cookieParser());

console.log("We had injected cookie parser");
app.use(express.static("Public"));

import userrouter from "./Routes/user.routes.js";
app.use("/agglomeration/user", userrouter);
export { app };
