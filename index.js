import { config } from "dotenv";
config();
import express, { json } from "express";
import { todoRoute } from "./routes/todos.routes.js";
import {registerRoute} from "./routes/register.routes.js";
import cors from "cors";
import bodyParser from 'body-parser'
import { loginRoute } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({origin: 'http://localhost', 
 credentials: true}));
app.use(json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/todos", todoRoute);
app.use("/register", registerRoute); 
app.use("/login", loginRoute);

app.all("*", (req, res, next) => {
  res.status(404).json({
    data: "Not Found this Route",
  });
});

app.use((err, req, res, next) => {
  res.status(err.code || 500).json({
    answer: {
      code: err.code || 500,
      data: err.message || "Server error",
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Connected on Port: ${process.env.PORT}`);
});
