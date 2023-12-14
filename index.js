import { config } from "dotenv";
config();
import express, { json } from "express";
import { todoRoute } from "./routes/todos.routes.js";
import {registerRoute} from "./routes/register.routes.js";
import cors from "cors";
import bodyParser from 'body-parser'
import { loginRoute } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { logoutRoute } from "./routes/logout.routes.js";
import { deleteUserRoute } from "./routes/deleteUser.routes.js";

const app = express();
const origin = ['http://127.0.0.1:5501', 'http://localhost:3030'] 

//allgemein gültige Mittelware!
app.use(cors({ origin: origin, credentials: true }));
app.use(json());
app.use(bodyParser.json());
app.use(cookieParser());


//Endpoint!
app.use("/todos", todoRoute);
app.use("/register", registerRoute); 

app.use("/login", loginRoute);
app.post("/test", (req, res) => {
  // Cookies aus der Anfrage abrufen
  const token = req.cookies.token;
  console.log(token);
  res.send("Cookies abgerufen"); // Diese Zeile ist nur sinnbildlich um die Anfrage abzuschließen :D
});
app.use("/logout", logoutRoute);
app.use("/delete", deleteUserRoute);

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
