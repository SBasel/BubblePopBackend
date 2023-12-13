import { config } from "dotenv";
config();
import express, { json } from "express";
import { todoRoute } from "./routes/todos.routes.js";
import {registerRoute} from "./routes/register.routes.js";
import cors from "cors";
import bodyParser from 'body-parser'

const app = express();
app.use(cors());
app.use(json());
app.use(bodyParser.json());

app.use("/todos", todoRoute);
app.use("/register", registerRoute); // Verwende eine separate Route für die Registrierung

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
